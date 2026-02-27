import ReceiptBottomToolbar from "../receipt-bottom-panel/receipt-bottom-panel";
import { Factors } from "../factors/factors";
import ListRoute from "../../../list/list-route";
import { ConfirmModal } from "../../../../components/shared-ui/modal/confirm-modal";
import { TOOLS } from "../../home.constant";
import { useHomeDesktopController } from "./home-desktop.hook";

export default function HomeDesktop() {
  const c = useHomeDesktopController();

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
                  active={c.activeTool === t.key}
                  onClick={() => c.setActiveTool(t.key)}
                  icon={t.icon}
                  label={t.label}
                />
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="min-h-0 flex-1 overflow-hidden">
            {c.isList ? (
              <ListRoute onOpenList={c.openSavedList} />
            ) : (
              <Factors
                resetKey={c.resetKey}
                warehouseId={c.warehouseId}
                onWarehouseChange={c.setWarehouseId}
                rows={c.rows}
                onRowsChange={c.setRows}
                selectedRow={c.selectedRow}
                onRowSelect={c.setSelectedRow}
              />
            )}
          </div>

          {/* FOOTER */}
          <ReceiptBottomToolbar
            activeTab={c.activeTab}
            onFirst={c.handleFirst}
            onPrev={c.handlePrev}
            onNext={c.handleNext}
            onLast={c.handleLast}
            onConfirm={c.isFactors ? c.handleConfirm : undefined}
            onDelete={c.isFactors ? c.requestDelete : undefined}
            onList={() => c.setActiveTool("list")}
            onSettings={() => {
              c.resetForm();
              c.setActiveTool("factors");
            }}
          />

          <ConfirmModal
            open={c.deleteOpen}
            title="حذف فاکتور"
            description="آیا مطمئن هستید که می‌خواهید این فاکتور را حذف کنید؟ این عمل قابل بازگشت نیست."
            confirmText="بله، حذف کن"
            cancelText="انصراف"
            onConfirm={c.confirmDelete}
            onCancel={c.cancelDelete}
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
