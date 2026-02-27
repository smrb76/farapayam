import { useMemo, useState } from "react";
import { loadLists } from "../../../utils/inventory-lists";
import { COLS } from "../list-route.constant";

export default function ListDesktop({
  onOpenList,
}: {
  onOpenList: (id: string) => void;
}) {
  const [version] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [q, setQ] = useState("");

  const lists = useMemo(() => {
    const items = loadLists();
    return items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [version]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return lists;

    const toSearchText = (obj: any) => {
      const parts: string[] = [];

      for (const [k, v] of Object.entries(obj ?? {})) {
        if (k === "rows") continue;
        if (v == null) continue;

        if (
          typeof v === "string" ||
          typeof v === "number" ||
          typeof v === "boolean"
        ) {
          parts.push(String(v));
          continue;
        }

        try {
          parts.push(JSON.stringify(v));
        } catch {}
      }

      parts.push(String(obj?.rows?.length ?? 0));
      if (obj?.createdAt) {
        parts.push(new Date(obj.createdAt).toLocaleString("fa-IR"));
      }

      return parts.join(" ").toLowerCase();
    };

    return lists.filter((it) => toSearchText(it).includes(query));
  }, [lists, q]);

  return (
    <div className="w-full overflow-auto bg-[#e7f0ff]">
      <div className="sticky top-0 z-40 border-b border-blue-300 bg-gradient-to-b from-[#e7f0ff] to-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm font-bold text-slate-800">لیست فاکتورها</div>
        </div>
      </div>

      <div className="p-4 min-h-96">
        {filtered.length === 0 ? (
          <div className="rounded border border-dashed border-blue-200 bg-white p-8 text-center text-sm text-slate-600 h-full">
            نتیجه‌ای پیدا نشد.
          </div>
        ) : (
          <div dir="rtl" className="h-[520px] w-full">
            <div className="h-full rounded-[3px] bg-white">
              <div className="h-full overflow-x-auto overflow-y-auto">
                <table className="w-max table-fixed border-separate border-spacing-0 text-[12px]">
                  <colgroup>
                    <col style={{ width: 10 }} />
                    {COLS.map((c) => (
                      <col
                        key={c.key}
                        style={c.width ? { width: c.width } : undefined}
                      />
                    ))}
                  </colgroup>

                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="border-b border-l border-blue-300 bg-gradient-to-b from-[#6186c4] to-[#6486b5]" />
                      {COLS.map((c) => (
                        <th
                          key={c.key}
                          className="truncate border-b border-l border-blue-300 bg-gradient-to-b from-[#6186c4] to-[#6486b5] px-2 py-1 text-right font-semibold text-white"
                          title={c.title}
                        >
                          {c.title}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((it, idx) => {
                      const isSelected = selectedRow === idx;
                      return (
                        <tr
                          onDoubleClick={() => onOpenList(it.id)}
                          key={it.id}
                          className={
                            isSelected
                              ? "bg-blue-50 cursor-pointer"
                              : idx % 2 === 0
                                ? "bg-white cursor-pointer"
                                : "bg-slate-50/50 cursor-pointer"
                          }
                        >
                          <td className="border-b border-l border-slate-200 p-0">
                            <button
                              type="button"
                              onClick={() => setSelectedRow(idx)}
                              className={[
                                "block h-full w-full min-h-5",
                                isSelected ? "bg-blue-600" : "bg-[#4f78b8]",
                                "hover:bg-blue-500",
                              ].join(" ")}
                              aria-label="Select row"
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls}
                              value={String(idx + 1)}
                              readOnly
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls}
                              value={String(it.title ?? "")}
                              readOnly
                              onClick={() => onOpenList(it.id)}
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls + " text-slate-600"}
                              value={new Date(it.createdAt).toLocaleString(
                                "fa-IR",
                              )}
                              readOnly
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls + " text-slate-600"}
                              value={String(it.warehouseId ?? "")}
                              readOnly
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls + " text-slate-600"}
                              value={String(it.rows?.length ?? 0)}
                              readOnly
                            />
                          </td>

                          <td className="border-b border-l border-slate-200 p-0">
                            <input
                              className={cellInputCls + " text-slate-400"}
                              value={String(it.id)}
                              readOnly
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex items-center gap-0.5 px-4 pb-2 fixed bottom-[119px]`}
      >
        <span className="whitespace-nowrap text-blue-900">جستجو:</span>
        <div className="min-w-0 flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="نام، شماره، انبار، تاریخ، ..."
            className="h-8 rounded border border-blue-200 bg-white px-2 text-[12px] text-slate-800 outline-none
                           focus:border-blue-400 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.12)]"
          />
        </div>
      </div>
    </div>
  );
}

const cellInputCls =
  "h-5 w-full bg-transparent px-2 text-slate-800 outline-none truncate " +
  "focus:bg-white focus:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.5)]";
