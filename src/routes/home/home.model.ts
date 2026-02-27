export type ToolKey =
  | "factors"
  | "recall"
  | "disable"
  | "refer"
  | "Un-Rialized"
  | "Waybill"
  | "Insert"
  | "Deleted Serials"
  | "Pricing"
  | "Payment"
  | "Warranty"
  | "list"
  | "";
export type SavedList = {
  id: string;
  title: string;
  createdAt: string;
  warehouseId: string;
  rows: any[];
};
