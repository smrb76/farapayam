import React from "react";

type Props = {
  activeTab?: "factors" | "list";
  onTabChange?: (tab: "factors" | "list") => void;
  onCancel?: () => void;
  onConfirm?: () => void;

  onFirst?: () => void;
  onPrev?: () => void;
  onPrint?: () => void;
  onList?: () => void;
  onNext?: () => void;
  onLast?: () => void;

  onDelete?: () => void;
  onEdit?: () => void;
  onSettings?: () => void;
};

export default function ReceiptBottomToolbar({
  activeTab = "factors",
  onTabChange,
  onCancel,
  onConfirm,
  onFirst,
  onPrev,
  onPrint,
  onList,
  onNext,
  onLast,
  onDelete,
  onEdit,
  onSettings,
}: Props) {
  const canFirst = !!onFirst;
  const canPrev = !!onPrev;
  const canNext = !!onNext;
  const canLast = !!onLast;

  const canPrint = !!onPrint;
  const canList = !!onList;

  const canDelete = !!onDelete;
  const canEdit = !!onEdit;
  const canSettings = !!onSettings;

  const canConfirm = !!onConfirm;
  const canCancel = !!onCancel;
  return (
    <div dir="rtl" className="mb-0 w-full fixed bottom-0">
      <div className="w-full bg-gradient-to-t from-[#9bc1fa] from-15% via-[#b7d4ff] via-30% to-[#e7f0ff] to-100%">
        <div className="flex items-end justify-between px-3 pt-1">
          <ReceiptMiniTabs
            activeTab={activeTab}
            onChange={(t) => {
              onTabChange?.(t);
              if (t === "list") {
                onList?.();
              } else {
                onSettings?.();
              }
            }}
          />
          <div />
        </div>
        <div className="mr-2.5 mt-1 h-11 w-full px-3">
          <div className="flex h-full items-center justify-between relative">
            <div className="flex items-center gap-2">
              <MiniBtn
                title="تنظیم"
                onClick={onSettings}
                icon="＋"
                iconBg="bg-emerald-500"
                disabled={!canSettings}
              />

              <MiniBtn
                title="ویرایش"
                onClick={onEdit}
                icon="✎"
                disabled={!canEdit}
              />
              <MiniBtn
                title="حذف"
                onClick={onDelete}
                icon="✖"
                disabled={!canDelete}
              />
            </div>

            <div className="flex items-center gap-2 absolute right-1/4">
              <RoundIconBtn title="اول" onClick={onFirst} disabled={!canFirst}>
                <NavIcons.First />
              </RoundIconBtn>
              <RoundIconBtn title="قبلی" onClick={onPrev} disabled={!canPrev}>
                <NavIcons.Prev />
              </RoundIconBtn>

              <RoundIconBtn title="چاپ" onClick={onPrint} disabled={!canPrint}>
                <NavIcons.Print />
              </RoundIconBtn>
              <RoundIconBtn title="لیست" onClick={onList} disabled={!canList}>
                <NavIcons.List />
              </RoundIconBtn>

              <RoundIconBtn title="بعدی" onClick={onNext} disabled={!canNext}>
                <NavIcons.Next />
              </RoundIconBtn>
              <RoundIconBtn title="آخر" onClick={onLast} disabled={!canLast}>
                <NavIcons.Last />
              </RoundIconBtn>
            </div>

            <div className="ml-9 flex items-center gap-2">
              <ActionBtn
                title="تایید"
                onClick={onConfirm}
                disabled={!canConfirm}
              >
                <span>تایید</span>
                <IconCircle>✓</IconCircle>
              </ActionBtn>
              <ActionBtn
                title="انصراف"
                onClick={onCancel}
                disabled={!canCancel}
              >
                <span>انصراف</span>
                <IconCircle>✕</IconCircle>
              </ActionBtn>
            </div>
          </div>
        </div>
        <div className="mt-3.5 flex flex-row items-center justify-between">
          <p>وضعیت فرم: نمایش</p>
          <p> ۱۴۰۴/۱۲/۰۷</p>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  title,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        "inline-flex h-8 items-center gap-3 rounded-[4px] border border-[#8aa6c8] bg-[#E1E1E1] px-4 text-[12px] font-semibold text-slate-700",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:brightness-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#6f86a7] bg-[#e9eef6] text-[12px] leading-none text-slate-700">
      {children}
    </span>
  );
}

function RoundIconBtn({
  children,
  title,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        "group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all",
        "border-[#7f97b7] bg-gradient-to-b from-[#f6f8fc] to-[#d7e2f2] shadow-[inset_0_1px_1px_rgba(255,255,255,1)]",
        "hover:from-[#ffffff] hover:to-[#e2ebf7] active:to-[#c5d6ee] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-[#f6f8fc] disabled:hover:to-[#d7e2f2] disabled:active:shadow-[inset_0_1px_1px_rgba(255,255,255,1)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-center opacity-80 group-hover:opacity-100 group-disabled:opacity-60">
        {children}
      </div>
    </button>
  );
}

function MiniBtn({
  title,
  onClick,
  icon,
  iconBg = "bg-red-500",
  disabled,
}: {
  title: string;
  onClick?: () => void;
  icon: string;
  iconBg?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        "inline-flex h-9 w-24 items-center gap-4 rounded-[4px] border border-[#8aa6c8] bg-[#E1E1E1] px-3 text-[12px] font-semibold text-slate-700",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:brightness-100",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-5 w-5 items-center justify-center rounded text-[12px] text-white",
          iconBg,
          disabled ? "opacity-60" : "",
        ].join(" ")}
      >
        {icon}
      </span>
      <span>{title}</span>
    </button>
  );
}

type TabKey = "factors" | "list";

export function ReceiptMiniTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange?: (t: TabKey) => void;
}) {
  return (
    <div dir="rtl" className="px-3 pt-2">
      {" "}
      {/* پس‌زمینه کلی برای تست */}
      <div className="relative flex items-end justify-start -space-x-2">
        <WinTab
          label="رکورد جاری"
          active={activeTab === "factors"}
          onClick={() => onChange?.("factors")}
        />
        <WinTab
          label="نمایش لیست"
          active={activeTab === "list"}
          onClick={() => onChange?.("list")}
        />

        {/* خط افقی زیرین که تب فعال روی آن قرار می‌گیرد */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#7f97b7] z-0" />
      </div>
    </div>
  );
}

function WinTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-[26px] min-w-[100px] px-4 transition-all duration-200",
        active ? "z-20 -mb-[1px]" : "z-10 opacity-90 hover:opacity-100",
      ].join(" ")}
    >
      {/* لایه پشت برای ایجاد حاشیه (Border) با استفاده از clip-path */}
      <div
        className="absolute inset-0 bg-[#8aa6c8]"
        style={{
          clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* بدنه اصلی تب */}
      <div
        className={[
          "absolute inset-[1px] bottom-0 flex items-center justify-center text-[12px]",
          active
            ? "bg-gradient-to-b from-[#fdfefe] to-[#d8e4f6] font-bold text-[#2d3e50]"
            : "bg-gradient-to-b from-[#e4ecf7] to-[#cbd9ef] text-[#4a5e75]",
        ].join(" ")}
        style={{
          clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {/* هایلایت براق بالای تب (اختیاری برای شباهت بیشتر) */}
        <div className="absolute top-0 left-[12%] right-[12%] h-[1px] bg-white/60" />

        <span className="relative z-10 top-[-1px]">{label}</span>
      </div>
    </button>
  );
}
const NavIcons = {
  First: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 19 22 12 13 5 13 19" fill="#334155" />
      <polygon points="2 19 11 12 2 5 2 19" fill="#334155" />
      <line x1="22" y1="5" x2="22" y2="19" />
    </svg>
  ),
  Prev: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="6 9 12 15 18 9"
        className="rotate-[-90deg] origin-center"
        fill="#334155"
      />
    </svg>
  ),
  Next: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="18 15 12 9 6 15"
        className="rotate-[-90deg] origin-center"
        fill="#334155"
      />
    </svg>
  ),
  Last: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 19 2 12 11 5 11 19" fill="#334155" />
      <polygon points="22 19 13 12 22 5 22 19" fill="#334155" />
      <line x1="2" y1="5" x2="2" y2="19" />
    </svg>
  ),
  List: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Print: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#334155"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" fill="#fff" />
    </svg>
  ),
};
