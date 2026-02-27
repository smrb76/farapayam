import React from 'react';

type Props = {
  activeTab?: 'record' | 'list';
  onTabChange?: (tab: 'record' | 'list') => void;
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
  activeTab = 'record',
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
  return (
    <div dir="rtl" className="mb-0 w-full">
      <div className="w-full bg-gradient-to-t from-[#9bc1fa] from-15% via-[#b7d4ff] via-30% to-[#e7f0ff] to-100%">
        <div className="flex items-end justify-between px-3 pt-1">
          <ReceiptMiniTabs activeTab={activeTab} onChange={(t) => onTabChange?.(t)} />
          <div />
        </div>
        <div className="mr-2.5 mt-1 h-11 w-full px-3">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-2">
              <MiniBtn title="تنظیم" onClick={onSettings} icon="＋" iconBg="bg-emerald-500" />

              <MiniBtn title="ویرایش" onClick={onEdit} icon="✎" />
              <MiniBtn title="حذف" onClick={onDelete} icon="✖" />
            </div>

            <div className="flex items-center gap-2">
              <RoundIconBtn title="اول" onClick={onFirst}>
                ⏮
              </RoundIconBtn>
              <RoundIconBtn title="قبلی" onClick={onPrev}>
                ◀
              </RoundIconBtn>

              <RoundIconBtn title="چاپ" onClick={onPrint}>
                🖨
              </RoundIconBtn>
              <RoundIconBtn title="لیست" onClick={onList}>
                ☰
              </RoundIconBtn>

              <RoundIconBtn title="بعدی" onClick={onNext}>
                ▶
              </RoundIconBtn>
              <RoundIconBtn title="آخر" onClick={onLast}>
                ⏭
              </RoundIconBtn>
            </div>

            <div className="ml-9 flex items-center gap-2">
              <ActionBtn title="تایید" onClick={onConfirm}>
                <span>تایید</span>
                <IconCircle>✓</IconCircle>
              </ActionBtn>
              <ActionBtn title="انصراف" onClick={onCancel}>
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
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex h-8 items-center gap-3 rounded-[4px] border border-[#8aa6c8] bg-[#E1E1E1] px-4 text-[12px] font-semibold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95"
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
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="h-8 w-8 rounded-full border border-[#7f97b7] bg-gradient-to-b from-[#f6f8fc] to-[#d7e2f2] text-[13px] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95"
    >
      {children}
    </button>
  );
}

function MiniBtn({
  title,
  onClick,
  icon,
  iconBg = 'bg-red-500',
}: {
  title: string;
  onClick?: () => void;
  icon: string;
  iconBg?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex h-9 w-24 items-center gap-4 rounded-[4px] border border-[#8aa6c8] bg-[#E1E1E1] px-3 text-[12px] font-semibold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded ${iconBg} text-[12px] text-white`}
      >
        {icon}
      </span>
      <span>{title}</span>
    </button>
  );
}

type TabKey = 'record' | 'list';

export function ReceiptMiniTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange?: (t: TabKey) => void;
}) {
  return (
    <div dir="rtl" className="px-3 pt-1">
      <div className="relative flex items-end justify-end gap-1">
        <WinTab
          label="رکورد جاری"
          active={activeTab === 'record'}
          onClick={() => onChange?.('record')}
        />
        <WinTab
          label="نمایش لیست"
          active={activeTab === 'list'}
          onClick={() => onChange?.('list')}
        />

        <div className="pointer-events-none absolute -bottom-[1px] left-0 right-0 h-[1px] bg-[#7f97b7]" />
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
        'relative h-[22px] min-w-[88px] whitespace-nowrap px-3 text-[12px] leading-[22px]',
        'rounded-t-[3px] border border-[#8aa6c8]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
        active ? 'z-20 -mb-[1px]' : 'z-10',
        active
          ? 'bg-gradient-to-b from-[#f7f9fe] to-[#d9e5f6] font-semibold text-slate-800'
          : 'bg-gradient-to-b from-[#e2e9f6] to-[#c6d6ee] text-slate-700 opacity-90',
      ].join(' ')}
      title={label}
    >
      <span
        className={[
          'pointer-events-none absolute left-[2px] right-[2px] top-[2px] h-[3px] rounded-t-[2px]',
          active ? 'bg-white/70' : 'bg-white/35',
        ].join(' ')}
      />
      <span className="relative">{label}</span>
    </button>
  );
}
