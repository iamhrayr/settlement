export enum SettlementStatus {
  Pending = "pending",
  Settled = "settled",
  Disputed = "disputed",
}

export interface Settlement {
  uuid: string;
  amount: number;
  status: SettlementStatus;
  lastResponse: string | null;
}
