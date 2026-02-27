type Props = {
  open: boolean;
  title?: string;
  items: string[];
  onClose: () => void;
  onSelect: (value: string) => void;
};

export default function GiverPickerModal({
  open,
  title = 'انتخاب دهنده کالا',
  items,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <button className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="close" />
      <div className="absolute left-1/2 top-24 w-[360px] -translate-x-1/2 rounded border border-slate-300 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 text-[13px]">
          <span className="font-semibold text-slate-800">{title}</span>
          <button
            onClick={onClose}
            className="h-6 w-6 rounded border border-slate-300 bg-white text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="p-2">
          {items.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => onSelect(x)}
              className="w-full border-b border-slate-100 px-3 py-2 text-right text-[12px] text-slate-800 hover:bg-blue-50"
            >
              {x}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
