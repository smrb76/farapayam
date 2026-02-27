import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { loadLists, clearLists } from "../../../utils/inventory-lists";

export default function ListMobile({
  onOpenList,
}: {
  onOpenList: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [version, setVersion] = useState(0);

  const lists = useMemo(() => {
    const items = loadLists();
    return items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [version]);

  return (
    <div dir="rtl" className="min-h-dvh bg-[#e7f0ff]">
      <div className="sticky top-0 z-50 border-b border-blue-300 bg-gradient-to-b from-[#9bc1fa] from-30% via-[#b7d4ff] via-55% to-[#e7f0ff] to-100%">
        <div className="flex items-center justify-between px-2 py-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="h-9 rounded border border-blue-200 bg-white/60 px-3 text-[12px] font-semibold text-slate-700"
          >
            برگشت
          </button>

          <div className="text-[13px] font-semibold text-slate-800">
            لیست فاکتورها
          </div>

          <button
            type="button"
            onClick={() => {
              clearLists();
              setVersion((v) => v + 1);
            }}
            className="h-9 rounded border border-red-200 bg-white/60 px-3 text-[12px] font-semibold text-red-700"
          >
            پاک کردن
          </button>
        </div>
      </div>

      <div className="p-2">
        {lists.length === 0 ? (
          <div className="rounded border border-dashed border-blue-200 bg-white p-6 text-center text-sm text-slate-600">
            هنوز فاکتوری ذخیره نشده.
          </div>
        ) : (
          <div className="grid gap-2">
            {lists.map((it) => (
              <div
                onClick={() => onOpenList(it.id)}
                key={it.id}
                className="rounded border border-blue-200 bg-white p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      {it.title}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {new Date(it.createdAt).toLocaleString("fa-IR")}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      انبار: {it.warehouseId} • ردیف‌ها: {it.rows?.length ?? 0}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">{it.id}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
