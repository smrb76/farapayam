import { useMemo, useState } from 'react';
import { Product } from '../mock-warehouses/mock-warehouses';

type Props = {
  open: boolean;
  title?: string;
  items: Product[];
  onClose: () => void;
  onSelect: (p: Product) => void;
};

export default function ProductPickerModal({
  open,
  title = 'انتخاب کالا',
  items,
  onClose,
  onSelect,
}: Props) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim();
    if (!s) return items;
    return items.filter((x) =>
      (x.nameFa + ' ' + x.nameEn + ' ' + x.code).toLowerCase().includes(s.toLowerCase()),
    );
  }, [items, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <button className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="close" />
      <div className="absolute left-1/2 top-24 w-[520px] -translate-x-1/2 rounded border border-slate-300 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 text-[13px]">
          <span className="font-semibold text-slate-800">{title}</span>
          <button
            onClick={onClose}
            className="h-6 w-6 rounded border border-slate-300 bg-white text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="p-3">
          <input
            className="h-7 w-full rounded border border-gray-400 bg-white px-2 text-[12px] outline-none"
            placeholder="جستجو: کد یا نام کالا…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="mt-3 max-h-[320px] overflow-auto border border-slate-200">
            {filtered.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p)}
                className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-3 py-2 text-right text-[12px] hover:bg-blue-50"
              >
                <div className="min-w-0">
                  <div className="truncate text-slate-800">{p.nameFa}</div>
                  <div className="truncate text-slate-500">{p.nameEn}</div>
                </div>
                <div className="shrink-0 font-mono text-slate-700">{p.code}</div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-[12px] text-slate-500">موردی پیدا نشد</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
