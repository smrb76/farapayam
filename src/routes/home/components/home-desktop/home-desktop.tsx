import { useCallback, useMemo, useState } from "react";
import ReceiptBottomToolbar from "../receipt-bottom-panel/receipt-bottom-panel";
import { WAREHOUSES } from "../../../../utils/mock-warehouses";

import { Factors } from "../factors/factors";
import ListRoute from "../../../list/list-route";
import { ConfirmModal } from "../../../../components/shared-ui/modal/confirm-modal";

type SavedList = {
  id: string;
  title: string;
  createdAt: string;
  warehouseId: string;
  rows: any[];
};

const LS_KEY = "inventory_lists_v1";

function loadLists(): SavedList[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLists(lists: SavedList[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(lists));
}

type ToolKey =
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

const TOOLS: Array<{ key: ToolKey; label: string; icon: string }> = [
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
const initialRows = Array.from({ length: 9 }).map((_, i) => ({ row: i + 1 }));

export default function HomeDesktop() {
  const [activeTool, setActiveTool] = useState<ToolKey>("factors");
  const activeTab = activeTool === "list" ? "list" : "factors";
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [warehouseId, setWarehouseId] = useState(WAREHOUSES[0].id);
  const [rows, setRows] = useState<any[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [editingListId, setEditingListId] = useState<string | null>(null);

  const resetForm = () => {
    setWarehouseId(WAREHOUSES[0].id);
    setRows(initialRows);
    setSelectedRow(null);
    setEditingListId(null);
    setResetKey((k) => k + 1); // ✅ ReceiptBar ریست میشه
  };

  const openSavedList = useCallback((id: string) => {
    const lists = loadLists();
    const item = lists.find((x: SavedList) => x.id === id);
    if (!item) return;

    setWarehouseId(item.warehouseId ?? WAREHOUSES[0].id);

    // حداقل ۹ ردیف
    const filled = Array.isArray(item.rows) ? [...item.rows] : [];
    while (filled.length < initialRows.length)
      filled.push({ row: filled.length + 1 });
    filled.forEach((r, i) => (r.row = i + 1));

    setRows(filled);
    setSelectedRow(null);

    setEditingListId(item.id); // ✅ این کلید رفتار update است
    setActiveTool("factors"); // ✅ برگرد به Factors
  }, []);

  const handleConfirm = () => {
    const lists: SavedList[] = loadLists();

    const cleanedRows = rows.filter(
      (r) =>
        String(r.code ?? "").trim() !== "" ||
        String(r.name ?? "").trim() !== "",
    );

    // ✅ حالت UPDATE
    if (editingListId) {
      const idx = lists.findIndex((x) => x.id === editingListId);
      if (idx === -1) {
        // اگر به هر دلیل پیدا نشد، به عنوان new ذخیره کن
        const nextNumber = lists.length + 1;
        const payload: SavedList = {
          id: `list${nextNumber}`,
          title: `لیست${nextNumber}`,
          createdAt: new Date().toISOString(),
          warehouseId,
          rows: cleanedRows,
        };
        saveLists([...lists, payload]);
        setEditingListId(payload.id);
        return;
      }

      const prev = lists[idx];

      const updated: SavedList = {
        ...prev,
        warehouseId,
        rows: cleanedRows,
        // اگر می‌خوای تاریخ “آخرین ویرایش” داشته باشی، یک فیلد updatedAt اضافه کن
        // updatedAt: new Date().toISOString(),
      };

      const next = [...lists];
      next[idx] = updated;
      saveLists(next);

      console.log("Updated:", updated);
      return;
    }

    // ✅ حالت CREATE
    const nextNumber = lists.length + 1;
    const payload: SavedList = {
      id: `list${nextNumber}`,
      title: `لیست${nextNumber}`,
      createdAt: new Date().toISOString(),
      warehouseId,
      rows: cleanedRows,
    };

    saveLists([...lists, payload]);
    setEditingListId(payload.id); // ✅ از این به بعد تاییدها update میشن (همون لیست)
    console.log("Saved new:", payload);
  };

  const requestDelete = () => {
    // اگر لیست ذخیره‌شده نیست، چیزی برای حذف نداریم
    if (!editingListId) {
      resetForm();
      return;
    }
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!editingListId) return;

    const lists: SavedList[] = loadLists();
    saveLists(lists.filter((x) => x.id !== editingListId));

    setDeleteOpen(false);
    resetForm();
    setActiveTool("factors"); // یا "list" اگر ترجیح میدی برگرده به لیست
  };

  const cancelDelete = () => setDeleteOpen(false);

  const getSortedLists = () => {
    const items: SavedList[] = loadLists();
    return items.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    ); // قدیمی -> جدید (برای next/prev منطقی)
  };

  const goToIndex = (idx: number) => {
    const items = getSortedLists();
    if (items.length === 0) return;

    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    openSavedList(items[clamped].id);
  };

  const getCurrentIndex = () => {
    const items = getSortedLists();
    if (!editingListId) return { items, index: -1 };
    const index = items.findIndex((x) => x.id === editingListId);
    return { items, index };
  };

  const handleFirst = () => {
    goToIndex(0);
  };

  const handleLast = () => {
    const items = getSortedLists();
    if (items.length === 0) return;
    goToIndex(items.length - 1);
  };

  const handlePrev = () => {
    const { items, index } = getCurrentIndex();

    if (items.length === 0) return;

    // اگر هنوز هیچ فاکتوری باز نیست، برو آخرین (یا اولی، سلیقه‌ای)
    if (index === -1) {
      goToIndex(items.length - 1);
      return;
    }

    if (index > 0) goToIndex(index - 1);
  };

  const handleNext = () => {
    const { items, index } = getCurrentIndex();

    if (items.length === 0) return;

    // اگر هنوز هیچ فاکتوری باز نیست، برو اولین
    if (index === -1) {
      goToIndex(0);
      return;
    }

    if (index < items.length - 1) goToIndex(index + 1);
  };

  const content = useMemo(() => {
    if (activeTool === "list") return <ListRoute onOpenList={openSavedList} />;

    return (
      <Factors
        resetKey={resetKey}
        warehouseId={warehouseId}
        onWarehouseChange={setWarehouseId}
        rows={rows}
        onRowsChange={setRows}
        selectedRow={selectedRow}
        onRowSelect={setSelectedRow}
      />
    );
  }, [activeTool, warehouseId, rows, selectedRow, openSavedList]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex h-full min-h-0 flex-col">
          {/* HEADER */}
          <div className="flex flex-col bg-gradient-to-b from-[#9bc1fa] from-30% via-[#b7d4ff] via-55% to-[#e7f0ff] to-100%">
            <div className="flex flex-row items-end justify-start pr-2 text-[13px]">
              <div className="border-l border-blue-50 px-3 py-1 font-medium text-white [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                ابزارهای عمومی
              </div>
              <div className="rounded-tl-lg border-l border-blue-100 bg-blue-50 pr-3 pl-5 py-1 font-medium text-blue-900 [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                ابزارهای عملیاتی
              </div>
              <div className="border-l border-blue-50 pr-1 pl-3 py-1 font-medium text-white [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                فرم های مرتبط
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-4 border-b border-blue-300 pr-3 py-1 text-[13px] text-slate-800">
              {TOOLS.map((t) => (
                <ToolBtn
                  key={t.key}
                  active={activeTool === t.key}
                  onClick={() => setActiveTool(t.key)}
                  icon={t.icon}
                  label={t.label}
                />
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="min-h-0 flex-1 overflow-hidden">{content}</div>

          {/* FOOTER */}
          <ReceiptBottomToolbar
            activeTab={activeTool === "list" ? "list" : "factors"}
            onFirst={handleFirst}
            onPrev={handlePrev}
            onNext={handleNext}
            onLast={handleLast}
            // بقیه
            onConfirm={activeTool === "factors" ? handleConfirm : undefined}
            onDelete={activeTool === "factors" ? requestDelete : undefined}
            onList={() => setActiveTool("list")}
            onSettings={() => {
              resetForm();
              setActiveTool("factors");
            }}
          />

          <ConfirmModal
            open={deleteOpen}
            title="حذف فاکتور"
            description="آیا مطمئن هستید که می‌خواهید این فاکتور را حذف کنید؟ این عمل قابل بازگشت نیست."
            confirmText="بله، حذف کن"
            cancelText="انصراف"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </div>
      </div>
    </div>
  );
}

function ToolBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "flex cursor-pointer flex-col items-center rounded px-2 py-1",
        active
          ? "border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2"
          : "bg-transparent",
      ].join(" ")}
    >
      <img src={icon} className="h-7" />
      <p>{label}</p>
    </div>
  );
}
