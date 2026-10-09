// First-time setup of the dev Home Assistant, idempotent: finishes onboarding with the dev user and
// adds the Pro Budget config entry, through the same REST endpoints the frontend uses. Node 22, no deps.
const BASE = process.env.HA_URL ?? "http://localhost:8123";
const USERNAME = process.env.HASS_USERNAME ?? "dev";
const PASSWORD = process.env.HASS_PASSWORD ?? "dev";
const CLIENT_ID = `${BASE}/`;

async function call(path, { method = "GET", body, token, form } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;
  if (body && !form) headers["content-type"] = "application/json";
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: form ? new URLSearchParams(body) : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
}

async function tokenFromCode(code) {
  const res = await call("/auth/token", {
    method: "POST",
    form: true,
    body: { grant_type: "authorization_code", code, client_id: CLIENT_ID },
  });
  return res.access_token;
}

async function onboard() {
  // Home Assistant removes the onboarding endpoint once onboarding is complete.
  const steps = await call("/api/onboarding").catch((err) => {
    if (String(err.message).includes("404")) return [];
    throw err;
  });
  const pending = new Set(steps.filter((s) => !s.done).map((s) => s.step));
  if (pending.size === 0) return null;
  let token;
  if (pending.has("user")) {
    const res = await call("/api/onboarding/users", {
      method: "POST",
      body: {
        client_id: CLIENT_ID,
        name: USERNAME,
        username: USERNAME,
        password: PASSWORD,
        language: "en",
      },
    });
    token = await tokenFromCode(res.auth_code);
    console.log(`created user ${USERNAME}`);
  } else {
    token = await login();
  }
  if (pending.has("core_config"))
    await call("/api/onboarding/core_config", { method: "POST", token, body: {} });
  if (pending.has("analytics"))
    await call("/api/onboarding/analytics", { method: "POST", token, body: {} });
  if (pending.has("integration")) {
    await call("/api/onboarding/integration", {
      method: "POST",
      token,
      body: { client_id: CLIENT_ID, redirect_uri: CLIENT_ID },
    });
  }
  console.log("onboarding done");
  return token;
}

async function login() {
  const flow = await call("/auth/login_flow", {
    method: "POST",
    body: { client_id: CLIENT_ID, handler: ["homeassistant", null], redirect_uri: CLIENT_ID },
  });
  const res = await call(`/auth/login_flow/${flow.flow_id}`, {
    method: "POST",
    body: { client_id: CLIENT_ID, username: USERNAME, password: PASSWORD },
  });
  if (res.type !== "create_entry")
    throw new Error(`login failed: ${JSON.stringify(res).slice(0, 200)}`);
  return tokenFromCode(res.result);
}

async function ensureConfigEntry(token) {
  const entries = await call("/api/config/config_entries/entry?domain=pro_budget", { token });
  if (entries.length) {
    console.log(`Pro Budget entry: ${entries[0].state}`);
    return;
  }
  const flow = await call("/api/config/config_entries/flow", {
    method: "POST",
    token,
    body: { handler: "pro_budget" },
  });
  const done = await call(`/api/config/config_entries/flow/${flow.flow_id}`, {
    method: "POST",
    token,
    body: {},
  });
  console.log(
    `Pro Budget entry: ${done.type === "create_entry" ? "created" : JSON.stringify(done).slice(0, 120)}`,
  );
}

// A small demo household, so the panel, the entities and the e2e tests have something to show.
// Seeded on first run (right after onboarding) or with `--seed`; the dev user owns every item.
const SEED = [
  {
    title: "Salary",
    type: "earning",
    amount: 3200,
    recurrence: "monthly",
    due_day: 28,
    category: "Other",
  },
  {
    title: "Rent",
    type: "expense",
    amount: 1250,
    recurrence: "monthly",
    due_day: 1,
    category: "Housing",
    shared: true,
  },
  {
    title: "Groceries",
    type: "expense",
    amount: 120,
    recurrence: "weekly",
    due_day: 6,
    category: "Groceries",
    cost_kind: "variable",
    shared: true,
  },
  {
    title: "Cleaner",
    type: "expense",
    amount: 80,
    recurrence: "monthly",
    due_day: 10,
    category: "Housing",
    payment_method: "manual",
  },
  {
    title: "Car insurance",
    type: "expense",
    amount: 640,
    recurrence: "annually",
    due_day: 15,
    due_month: 3,
    category: "Insurance",
  },
  {
    title: "Gym",
    type: "expense",
    amount: 90,
    recurrence: "quarterly",
    due_day: 5,
    due_month: 1,
    category: "Health",
  },
  {
    title: "ETF savings plan",
    type: "saving",
    amount: 400,
    recurrence: "monthly",
    due_day: 2,
    category: "Other",
  },
];

async function seed(token) {
  for (const item of SEED) {
    await call("/api/services/pro_budget/add_item", { method: "POST", token, body: item });
  }
  console.log(`seeded ${SEED.length} demo items`);
}

const onboarded = await onboard();
const token = onboarded ?? (await login());
await ensureConfigEntry(token);
if (onboarded || process.argv.includes("--seed")) await seed(token);
console.log(`ready: ${BASE}  (user ${USERNAME} / ${PASSWORD})`);
