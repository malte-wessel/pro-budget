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
  // dev
  {
    title: "Salary",
    type: "earning",
    amount: 3200,
    recurrence: "monthly",
    due_day: 28,
    category: "Salary",
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
    title: "Electricity",
    type: "expense",
    amount: 95,
    recurrence: "monthly",
    due_day: 15,
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
    title: "Fuel",
    type: "expense",
    amount: 60,
    recurrence: "biweekly",
    due_day: 5,
    category: "Mobility",
    cost_kind: "variable",
    payment_method: "credit_card",
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
    title: "Streaming",
    type: "expense",
    amount: 15,
    recurrence: "monthly",
    due_day: 3,
    category: "Subscriptions",
    shared: true,
  },
  {
    title: "Fibre internet",
    type: "expense",
    amount: 45,
    recurrence: "monthly",
    due_day: 12,
    category: "Internet",
    shared: true,
  },
  {
    title: "ETF savings plan",
    type: "saving",
    amount: 400,
    recurrence: "monthly",
    due_day: 2,
    category: "Savings",
  },
  // Anna
  {
    user: "anna",
    title: "Salary Anna",
    type: "earning",
    amount: 2600,
    recurrence: "monthly",
    due_day: 27,
    category: "Salary",
  },
  {
    user: "anna",
    title: "Daycare",
    type: "expense",
    amount: 380,
    recurrence: "monthly",
    due_day: 1,
    category: "Children",
    shared: true,
  },
  {
    user: "anna",
    title: "Kids' clothes",
    type: "expense",
    amount: 60,
    recurrence: "monthly",
    due_day: 20,
    category: "Children",
    cost_kind: "variable",
    shared: true,
    payment_method: "manual",
  },
  {
    user: "anna",
    title: "Health insurance top-up",
    type: "expense",
    amount: 55,
    recurrence: "monthly",
    due_day: 1,
    category: "Insurance",
  },
  {
    user: "anna",
    title: "Phone",
    type: "expense",
    amount: 25,
    recurrence: "monthly",
    due_day: 8,
    category: "Internet",
  },
  {
    user: "anna",
    title: "Theatre subscription",
    type: "expense",
    amount: 240,
    recurrence: "semi_annually",
    due_day: 1,
    due_month: 2,
    category: "Leisure",
  },
  {
    user: "anna",
    title: "Bike service",
    type: "expense",
    amount: 120,
    recurrence: "annually",
    due_day: 10,
    due_month: 4,
    category: "Mobility",
    payment_method: "manual",
  },
  {
    user: "anna",
    title: "Pocket money",
    type: "expense",
    amount: 10,
    recurrence: "weekly",
    due_day: 7,
    category: "Children",
  },
  {
    user: "anna",
    title: "Emergency fund",
    type: "saving",
    amount: 250,
    recurrence: "monthly",
    due_day: 3,
    category: "Savings",
  },
  {
    user: "anna",
    title: "Holiday fund",
    type: "saving",
    amount: 150,
    recurrence: "monthly",
    due_day: 3,
    category: "Savings",
  },
];

/** A websocket session: `send(message)` resolves with the result; `event()` with the next event. */
async function connect(token) {
  const ws = new WebSocket(BASE.replace(/^http/, "ws") + "/api/websocket");
  const queue = [];
  const waiters = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (waiters.length) waiters.shift()(m);
    else queue.push(m);
  };
  const next = () =>
    queue.length ? Promise.resolve(queue.shift()) : new Promise((r) => waiters.push(r));
  await new Promise((r) => (ws.onopen = r));
  await next(); // auth_required
  ws.send(JSON.stringify({ type: "auth", access_token: token }));
  await next(); // auth_ok
  let id = 1;
  return {
    async send(message) {
      ws.send(JSON.stringify({ id: id++, ...message }));
      const res = await next();
      if (res.success === false) throw new Error(`${message.type}: ${res.error?.message}`);
      return res.result;
    },
    event: next,
    close: () => ws.close(),
  };
}

/** The current budget state (categories, items, users) through the integration's subscription. */
async function budgetState(token) {
  const c = await connect(token);
  await c.send({ type: "pro_budget/subscribe" });
  const state = (await c.event()).event;
  c.close();
  return state;
}

// A second household member, so the panel shows the member filter, fairness and per-member entities.
const SECOND_USER = { name: "Anna", username: "anna", password: "anna" };

async function ensureSecondUser(token) {
  const c = await connect(token);
  const users = await c.send({ type: "config/auth/list" });
  let user = users.find((u) => u.username === SECOND_USER.username || u.name === SECOND_USER.name);
  if (!user) {
    user = await c.send({
      type: "config/auth/create",
      name: SECOND_USER.name,
      group_ids: ["system-users"],
      local_only: false,
    });
    user = user.user ?? user;
    await c.send({
      type: "config/auth_provider/homeassistant/create",
      user_id: user.id,
      username: SECOND_USER.username,
      password: SECOND_USER.password,
    });
    console.log(
      `created user ${SECOND_USER.name} (${SECOND_USER.username} / ${SECOND_USER.password})`,
    );
  }
  c.close();
  return user.id;
}

async function seed(token) {
  const annaId = await ensureSecondUser(token);
  const existing = new Set((await budgetState(token)).items.map((i) => i.title));
  let added = 0;
  for (const { user, ...item } of SEED) {
    if (existing.has(item.title)) continue;
    const body = user === "anna" ? { ...item, user_id: annaId } : item;
    await call("/api/services/pro_budget/add_item", { method: "POST", token, body });
    added += 1;
  }
  console.log(`seeded ${added} demo items (${SEED.length - added} already present)`);
}

const onboarded = await onboard();
const token = onboarded ?? (await login());
await ensureConfigEntry(token);
if (onboarded || process.argv.includes("--seed")) await seed(token);
console.log(`ready: ${BASE}  (user ${USERNAME} / ${PASSWORD})`);
