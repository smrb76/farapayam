import { ToolKey } from "./home.model";

export const TOOLS: Array<{ key: ToolKey; label: string; icon: string }> = [
  {
    key: "factors",
    label: "عوامل فاکتور",
    icon: "static/icons/Self-Payment-Touch--Streamline-Ultimate.svg",
  },
  {
    key: "recall",
    label: "فراخوانی",
    icon: "static/icons/Move-To-Bottom--Streamline-Ultimate.svg",
  },
  {
    key: "disable",
    label: "ابطال/احیا",
    icon: "static/icons/Database-Disable--Streamline-Ultimate.svg",
  },
  {
    key: "refer",
    label: "ارجاع",
    icon: "static/icons/Road-Sign-Hairpin-Turn-Left--Streamline-Ultimate.svg",
  },
  {
    key: "Un-Rialized",
    label: "ریالی نشده ها",
    icon: "static/icons/Accounting-Bill-Stack-1--Streamline-Ultimate.svg",
  },
  {
    key: "Waybill",
    label: "بارنامه و باسکول",
    icon: "static/icons/Delivery-Truck-Cargo--Streamline-Ultimate.svg",
  },
  {
    key: "Insert",
    label: "درج بین اسناد",
    icon: "static/icons/Folder-Add--Streamline-Ultimate.svg",
  },
  {
    key: "Deleted Serials",
    label: "سریال های حذف شده",
    icon: "static/icons/Email-Action-Remove--Streamline-Ultimate.svg",
  },
  {
    key: "Pricing",
    label: "قیمت گذاری",
    icon: "static/icons/Cash-Briefcase--Streamline-Ultimate.svg",
  },
  {
    key: "Payment",
    label: "پرداخت",
    icon: "static/icons/Receipt-Dollar--Streamline-Ultimate.svg",
  },
  {
    key: "Warranty",
    label: "صدور کارت گارانتی",
    icon: "static/icons/Gaming-Ribbon-First--Streamline-Ultimate.svg",
  },
];
export const initialRows = Array.from({ length: 9 }).map((_, i) => ({
  row: i + 1,
}));
export const LS_KEY = "inventory_lists_v1";
