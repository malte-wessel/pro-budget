// Typed websocket client for the integration's commands.
import type { HomeAssistant } from "./ha/types.ts";
import type {
  BudgetState,
  Category,
  Insights,
  Item,
  ItemFields,
  MonthStats,
  OccurrenceDay,
} from "./types.ts";

const D = "pro_budget";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

async function call<T>(hass: HomeAssistant, message: Record<string, unknown>): Promise<T> {
  try {
    return await hass.callWS<T>(message as { type: string });
  } catch (err) {
    const e = err as { code?: string; message?: string };
    throw new ApiError(e.code ?? "unknown", e.message ?? String(err));
  }
}

export const api = {
  subscribe(
    hass: HomeAssistant,
    onState: (state: BudgetState) => void,
  ): Promise<() => Promise<void>> {
    return hass.connection.subscribeMessage<BudgetState>(onState, { type: `${D}/subscribe` });
  },
  createCategory: (hass: HomeAssistant, fields: Partial<Category>) =>
    call<Category>(hass, { type: `${D}/categories/create`, fields }),
  updateCategory: (hass: HomeAssistant, category_id: string, fields: Partial<Category>) =>
    call<Category>(hass, { type: `${D}/categories/update`, category_id, fields }),
  deleteCategory: (hass: HomeAssistant, category_id: string) =>
    call<null>(hass, { type: `${D}/categories/delete`, category_id }),
  createItem: (hass: HomeAssistant, fields: ItemFields) =>
    call<Item>(hass, { type: `${D}/items/create`, fields }),
  updateItem: (hass: HomeAssistant, item_id: string, fields: Partial<ItemFields>) =>
    call<Item>(hass, { type: `${D}/items/update`, item_id, fields }),
  deleteItem: (hass: HomeAssistant, item_id: string) =>
    call<null>(hass, { type: `${D}/items/delete`, item_id }),
  setPaid: (hass: HomeAssistant, item_id: string, date: string, paid: boolean) =>
    call<null>(hass, { type: `${D}/paid/set`, item_id, date, paid }),
  stats: (hass: HomeAssistant, year: number, month: number, user_id?: string) =>
    call<MonthStats[]>(hass, { type: `${D}/stats`, year, month, ...(user_id ? { user_id } : {}) }),
  insights: (hass: HomeAssistant, user_id: string, year: number) =>
    call<Insights>(hass, { type: `${D}/insights`, user_id, year }),
  updateConfig: (
    hass: HomeAssistant,
    fields: { members?: string[]; lead_days?: number; currency?: string | null },
  ) => call<Record<string, unknown>>(hass, { type: `${D}/config/update`, ...fields }),
  occurrences: (hass: HomeAssistant, start: string, end: string, user_id?: string) =>
    call<OccurrenceDay[]>(hass, {
      type: `${D}/occurrences`,
      start,
      end,
      ...(user_id ? { user_id } : {}),
    }),
};
