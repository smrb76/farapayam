import React, { useCallback, useMemo, useState } from "react";
import ReceiptBar from "../receipt-bar/receipt-bar";
import ReceiptBottomToolbar from "../receipt-bottom-panel/receipt-bottom-panel";
import ReceiptScrollableTable from "../receipt-scrollable-table/receipt-scrollable-table";
import ReceiptSummaryPanel from "../receipt-summary-panel/receipt-summary-panel";
import { WAREHOUSES } from "../../../../utils/mock-warehouses";
import ListRoute from "../../../list/list-route";
import { ConfirmModal } from "../../../../components/shared-ui/modal/confirm-modal";

const initialRows = Array.from({ length: 9 }).map((_, i) => ({ row: i + 1 }));

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

type MobileTab = "header" | "items" | "summary";

export default function HomeMobile() {
  const [activeTool, setActiveTool] = useState<any>("factors");
  const activeTab = activeTool === "list" ? "list" : "factors";

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState<MobileTab>("items");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [warehouseId, setWarehouseId] = useState(WAREHOUSES[0].id);
  const [rows, setRows] = useState<any[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editingListId, setEditingListId] = useState<string | null>(null);

  const resetForm = () => {
    setWarehouseId(WAREHOUSES[0].id);
    setRows(initialRows);
    setSelectedRow(null);
    setEditingListId(null);

    setTab("items");
    setResetKey((k) => k + 1);
  };

  const openSavedList = useCallback((id: string) => {
    const lists = loadLists();
    const item = lists.find((x) => x.id === id);
    if (!item) return;

    setWarehouseId(item.warehouseId ?? WAREHOUSES[0].id);

    const filled = Array.isArray(item.rows) ? [...item.rows] : [];
    while (filled.length < initialRows.length)
      filled.push({ row: filled.length + 1 });
    filled.forEach((r, i) => (r.row = i + 1));

    setRows(filled);
    setSelectedRow(null);

    setEditingListId(item.id);
    setActiveTool("factors");
    setTab("items");
  }, []);

  const handleConfirm = () => {
    const lists = loadLists();

    const cleanedRows = rows.filter(
      (r) =>
        String(r.code ?? "").trim() !== "" ||
        String(r.name ?? "").trim() !== "",
    );

    if (editingListId) {
      const idx = lists.findIndex((x) => x.id === editingListId);

      if (idx === -1) {
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
      const updated: SavedList = { ...prev, warehouseId, rows: cleanedRows };
      const next = [...lists];
      next[idx] = updated;
      saveLists(next);
      return;
    }

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
  };

  const requestDelete = () => {
    if (!editingListId) {
      resetForm();
      return;
    }
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!editingListId) return;
    const lists = loadLists();
    saveLists(lists.filter((x) => x.id !== editingListId));

    setDeleteOpen(false);
    resetForm();
    setActiveTool("factors");
  };

  const cancelDelete = () => setDeleteOpen(false);

  const getSortedLists = () => {
    const items = loadLists();
    return items.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  };

  const goToIndex = (idx: number) => {
    const items = getSortedLists();
    if (!items.length) return;

    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    openSavedList(items[clamped].id);
  };

  const getCurrentIndex = () => {
    const items = getSortedLists();
    if (!editingListId) return { items, index: -1 };
    return { items, index: items.findIndex((x) => x.id === editingListId) };
  };

  const handleFirst = () => goToIndex(0);

  const handleLast = () => {
    const items = getSortedLists();
    if (!items.length) return;
    goToIndex(items.length - 1);
  };

  const handlePrev = () => {
    const { items, index } = getCurrentIndex();
    if (!items.length) return;
    if (index === -1) return goToIndex(items.length - 1);
    if (index > 0) goToIndex(index - 1);
  };

  const handleNext = () => {
    const { items, index } = getCurrentIndex();
    if (!items.length) return;
    if (index === -1) return goToIndex(0);
    if (index < items.length - 1) goToIndex(index + 1);
  };

  const content = useMemo(() => {
    if (activeTool === "list") {
      return (
        <div className="px-2 pb-24 pt-2">
          <ListRoute onOpenList={openSavedList} />
        </div>
      );
    }

    return (
      <>
        <main className="px-2 pb-24 pt-2">
          {tab === "header" && (
            <div className="rounded border border-blue-200 bg-white">
              <div className="overflow-x-auto">
                <div className="min-w-[980px]">
                  <ReceiptBar
                    key={resetKey}
                    warehouseId={warehouseId}
                    onWarehouseChange={setWarehouseId}
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "items" && (
            <div className="rounded border border-blue-200 bg-white">
              <div className="min-h-0">
                <ReceiptScrollableTable
                  rows={rows}
                  warehouseId={warehouseId}
                  onRowsChange={setRows}
                  onRowSelect={setSelectedRow}
                />
              </div>
            </div>
          )}

          {tab === "summary" && (
            <div className="rounded border border-blue-200 bg-white">
              <div className="overflow-x-auto">
                <div className="min-w-[980px]">
                  <ReceiptSummaryPanel
                    selectedRow={selectedRow}
                    rows={rows as any}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }, [
    activeTool,
    tab,
    resetKey,
    warehouseId,
    rows,
    selectedRow,
    openSavedList,
  ]);

  return (
    <div dir="rtl" className="min-h-dvh bg-[#e7f0ff]">
      {activeTool === "factors" && (
        <div className="sticky top-0 z-50 border-b border-blue-300 bg-gradient-to-b from-[#9bc1fa] from-30% via-[#b7d4ff] via-55% to-[#e7f0ff] to-100%">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="grid h-9 w-9 place-items-center rounded border border-blue-200 bg-white/60 text-slate-700"
                aria-label="open menu"
              >
                ☰
              </button>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-slate-800">
                  ابزار های عملیاتی
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 bg-[#ddecff] px-2 py-1 text-[12px]">
            <div className="flex gap-1">
              <div className="rounded border border-gray-400 px-2 py-1 font-semibold text-slate-800">
                وضعیت: رسیدموقت
              </div>
              <div className="rounded border border-gray-400 px-2 py-1 font-semibold text-slate-800">
                ساختار ارزی فعال
              </div>
            </div>
            <div className="flex gap-2">
              <img
                src="static/icons/Information-Circle--Streamline-Ultimate.svg"
                className="h-5"
              />
              <img
                src="static/icons/Common-File-Text--Streamline-Ultimate.svg"
                className="h-5"
              />
              <img
                src="static/icons/Alphabet--Streamline-Bootstrap.svg"
                className="h-5"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 px-2 pb-2 pt-2">
            <TabBtn active={tab === "header"} onClick={() => setTab("header")}>
              سربرگ
            </TabBtn>
            <TabBtn active={tab === "items"} onClick={() => setTab("items")}>
              اقلام
            </TabBtn>
            <TabBtn
              active={tab === "summary"}
              onClick={() => setTab("summary")}
            >
              جمع‌بندی
            </TabBtn>
          </div>
        </div>
      )}

      {content}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-300 bg-gradient-to-t from-[#9bc1fa] from-15% via-[#b7d4ff] via-30% to-[#e7f0ff] to-100%">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <ReceiptBottomToolbar
              activeTab={activeTab}
              onTabChange={(t) => setActiveTool(t)}
              onList={() => setActiveTool("list")}
              onSettings={() => {
                resetForm();
                setActiveTool("factors");
              }}
              onConfirm={activeTool === "factors" ? handleConfirm : undefined}
              onDelete={activeTool === "factors" ? requestDelete : undefined}
              onFirst={activeTool === "factors" ? handleFirst : undefined}
              onPrev={activeTool === "factors" ? handlePrev : undefined}
              onNext={activeTool === "factors" ? handleNext : undefined}
              onLast={activeTool === "factors" ? handleLast : undefined}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title="حذف فاکتور"
        description="آیا مطمئن هستید که می‌خواهید این فاکتور را حذف کنید؟ این عمل قابل بازگشت نیست."
        confirmText="بله، حذف کن"
        cancelText="انصراف"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {drawerOpen && (
        <Drawer onClose={() => setDrawerOpen(false)}>
          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-800">
              ابزارهای عملیاتی
            </div>

            <div className="grid grid-cols-3 gap-2">
              <ToolBtn
                active={activeTool === "factors"}
                onClick={() => {
                  setActiveTool("factors");
                  setDrawerOpen(false);
                }}
                icon="static/icons/Self-Payment-Touch--Streamline-Ultimate.svg"
                label="عوامل فاکتور"
              />
              <ToolBtn
                active={activeTool === "recall"}
                onClick={() => setActiveTool("recall")}
                icon="static/icons/Move-To-Bottom--Streamline-Ultimate.svg"
                label="فراخوانی"
              />
              <ToolBtn
                active={activeTool === "disable"}
                onClick={() => setActiveTool("disable")}
                icon="static/icons/Database-Disable--Streamline-Ultimate.svg"
                label="ابطال/احیا"
              />
              <ToolBtn
                active={activeTool === "refer"}
                onClick={() => setActiveTool("refer")}
                icon="static/icons/Road-Sign-Hairpin-Turn-Left--Streamline-Ultimate.svg"
                label="ارجاع"
              />
              <ToolBtn
                active={activeTool === "Un-Rialized"}
                onClick={() => setActiveTool("Un-Rialized")}
                icon="static/icons/Accounting-Bill-Stack-1--Streamline-Ultimate.svg"
                label="ریالی نشده‌ها"
              />
              <ToolBtn
                active={activeTool === "Waybill"}
                onClick={() => setActiveTool("Waybill")}
                icon="static/icons/Delivery-Truck-Cargo--Streamline-Ultimate.svg"
                label="بارنامه/باسکول"
              />
              <ToolBtn
                active={activeTool === "Insert"}
                onClick={() => setActiveTool("Insert")}
                icon="static/icons/Folder-Add--Streamline-Ultimate.svg"
                label="درج بین اسناد"
              />
              <ToolBtn
                active={activeTool === "Deleted Serials"}
                onClick={() => setActiveTool("Deleted Serials")}
                icon="static/icons/Email-Action-Remove--Streamline-Ultimate.svg"
                label="سریال حذف شده"
              />
              <ToolBtn
                active={activeTool === "Pricing"}
                onClick={() => setActiveTool("Pricing")}
                icon="static/icons/Cash-Briefcase--Streamline-Ultimate.svg"
                label="قیمت‌گذاری"
              />
              <ToolBtn
                active={activeTool === "Payment"}
                onClick={() => setActiveTool("Payment")}
                icon="static/icons/Receipt-Dollar--Streamline-Ultimate.svg"
                label="پرداخت"
              />
              <ToolBtn
                active={activeTool === "Warranty"}
                onClick={() => setActiveTool("Warranty")}
                icon="static/icons/Gaming-Ribbon-First--Streamline-Ultimate.svg"
                label="کارت گارانتی"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-10 w-full rounded-lg border border-blue-200 bg-white text-sm font-semibold text-slate-700"
              >
                بستن
              </button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

function TabBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 rounded border text-[12px] font-semibold",
        active
          ? "border-blue-300 bg-white text-slate-800"
          : "border-blue-100 bg-white/60 text-slate-600",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ToolBtn({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px]",
        active
          ? "border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc]"
          : "border-blue-100 bg-white",
      ].join(" ")}
    >
      <img src={icon} className="h-6" />
      <span className="text-slate-800">{label}</span>
    </button>
  );
}

function Drawer({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="close overlay"
      />
      <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] overflow-y-auto bg-[#e7f0ff] p-3 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800">منو</div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded border border-blue-200 bg-white/60"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
