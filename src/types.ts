// Data as the backend sends it over the websocket (see custom_components/pro_budget/websocket.py).

export type ItemType = "earning" | "expense" | "saving";
export type Recurrence =
  "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "semi_annually" | "annually";
export type CostKind = "fixed" | "variable";
export type PaymentMethod = "direct_debit" | "standing_order" | "manual" | "credit_card" | "paypal";

export const ITEM_TYPES: ItemType[] = ["earning", "expense", "saving"];
export const RECURRENCES: Recurrence[] = [
  "daily",
  "weekly",
  "biweekly",
  "monthly",
  "quarterly",
  "semi_annually",
  "annually",
];
export const COST_KINDS: CostKind[] = ["fixed", "variable"];
export const PAYMENT_METHODS: PaymentMethod[] = [
  "direct_debit",
  "standing_order",
  "manual",
  "credit_card",
  "paypal",
];
export const LONG_RECURRENCES: Recurrence[] = ["quarterly", "semi_annually", "annually"];

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  /** A Home Assistant colour token name, e.g. "orange", or null. */
  color: string | null;
  order: number;
}

export interface Item {
  id: string;
  title: string;
  type: ItemType;
  amount: number; // cents
  currency: string | null; // null: household currency
  category_id: string;
  recurrence: Recurrence;
  due_day: number | null;
  due_month: number | null;
  cost_kind: CostKind;
  shared: boolean;
  user_id: string;
  payment_method: PaymentMethod | null;
  start: string | null;
  end: string | null;
  created: string;
  updated: string;
}

/** Editable fields of an item. */
export type ItemFields = Omit<Item, "id" | "created" | "updated">;

export interface User {
  id: string;
  name: string;
  is_admin: boolean;
}

export interface BudgetState {
  categories: Category[];
  items: Item[];
  paid: Record<string, string[]>;
  users: User[];
  /** Every active human user: the candidates for membership. */
  all_users: User[];
  config: {
    currency: string;
    currency_override: string | null;
    lead_days: number;
    /** Configured member ids; empty means everyone. */
    members: string[];
    language: string;
  };
}

export interface ExpenseSplit {
  total: number;
  shared: number;
  personal: number;
  fixed: number;
  variable: number;
}

export interface MemberStats {
  user_id: string;
  earnings: number;
  expenses: ExpenseSplit;
  savings: number;
  balance: number;
}

export interface Fairness {
  user_id: string;
  shared_costs_paid: number;
  shared_cost_share: number | null;
  income: number;
  income_share: number | null;
}

export interface CategoryRow {
  category_id: string;
  earnings: number;
  expenses: number;
  savings: number;
}

export interface MonthStats {
  currency: string;
  members: MemberStats[];
  totals: { income: number; expenses: number; savings: number; remaining: number };
  fairness: Fairness[];
  categories: CategoryRow[];
}

export interface InsightGroup {
  items: { item_id: string; monthly: number }[];
  total: number;
}

export interface Insights {
  earnings: InsightGroup;
  expenses: InsightGroup;
  savings: InsightGroup;
  savings_rate: number | null;
  fixed_cost_rate: number | null;
  top_expenses: string[];
  calendar: { month: number; total: number; entries: { item_id: string; due: number }[] }[];
  unscheduled: string[];
  avg_month: number;
  max_month: number | null;
  min_month: number | null;
}

export interface OccurrenceDay {
  date: string | null; // null: unscheduled items
  entries: { item_id: string; paid: boolean }[];
}
