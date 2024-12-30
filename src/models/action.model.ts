export interface ActionMessage {
  actionType: ActionType;
  value?: string | number;
  img: string;
}

export type ActionType = "top-text-filter" | "blur-filter" | "edges-filter";
