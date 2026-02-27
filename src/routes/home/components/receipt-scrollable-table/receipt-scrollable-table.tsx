import ProductPickerModal from "../product-picker-modal/product-picker-modal";
import { type Product, WAREHOUSES } from "../../../../utils/mock-warehouses";
import { useState, useMemo, useEffect } from "react";
import GiverPickerModal from "../giver-picker-modal/giver-picker-modal";

export type Giver = { id: string; name: string };

type Col = {
  key: string;
  title: string;
  width?: number;
  readOnly?: boolean;
};

const COLS: Col[] = [
  { key: "row", title: "ردیف", width: 110, readOnly: true },
  { key: "code", title: "کد کالا", width: 120 },
  { key: "serial", title: "شماره فنی", width: 120 },
  { key: "p1", title: "ویژگی 1", width: 120 },
  { key: "p2", title: "ویژگی 2", width: 120 },
  { key: "p3", title: "ویژگی 3", width: 120 },
  { key: "p4", title: "ویژگی 4", width: 120 },
  { key: "name", title: "نام کالا", width: 130 },
  { key: "en", title: "نام انگلیسی کالا", width: 130 },
  { key: "unit", title: "تحویل دهنده کالا", width: 120 },
  { key: "unitName", title: "نام تحویل دهنده ", width: 120 },
  { key: "qty", title: "مقدار", width: 120 },
  { key: "price", title: "بهای واحد", width: 120 },
  { key: "total", title: "مبلغ کل", width: 130, readOnly: true },
];

type Row = Record<string, string | number>;

const MOCK_ROWS: Row[] = Array.from({ length: 9 }).map((_, i) => ({
  row: i + 1,
  code: "",
  serial: "",
  p1: "",
  p2: "",
  p3: "",
  p4: "",
  name: "",
  en: "",
  unit: "",
  unitName: "",
  qty: "",
  price: "",
  total: "",
}));

export default function ReceiptScrollableTable({
  rows = MOCK_ROWS,
  onRowsChange,
  onRowSelect,
  warehouseId,
}: {
  rows?: Row[];
  onRowsChange?: (next: Row[]) => void;
  onRowSelect?: (row: Row) => void;
  warehouseId: string;
}) {
  const [data, setData] = useState<Row[]>(rows);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const colMap = useMemo(() => new Map(COLS.map((c) => [c.key, c])), []);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerRowIndex, setPickerRowIndex] = useState<number | null>(null);

  useEffect(() => setData(rows), [rows]);

  const products = useMemo(() => {
    const w = WAREHOUSES.find((x) => x.id === warehouseId);
    return w?.products ?? [];
  }, [warehouseId]);

  const openPickerForRow = (rowIndex: number) => {
    setPickerRowIndex(rowIndex);
    setPickerOpen(true);
  };

  const setCell = (rowIndex: number, key: string, value: string) => {
    setData((prev) => {
      const next = prev.map((r, i) =>
        i === rowIndex ? { ...r, [key]: value } : r,
      );

      if (key === "qty" || key === "price") {
        const r = next[rowIndex];
        const qty = Number(String(r.qty ?? "").replace(/,/g, "")) || 0;
        const price = Number(String(r.price ?? "").replace(/,/g, "")) || 0;
        next[rowIndex] = { ...r, total: qty * price };
      }

      onRowsChange?.(next);
      if (selectedRow === rowIndex) onRowSelect?.(next[rowIndex]);
      return next;
    });
  };

  const applyProductToRow = (p: Product) => {
    if (pickerRowIndex == null) return;

    setData((prev) => {
      const next = prev.map((r, i) =>
        i === pickerRowIndex
          ? {
              ...r,
              code: p.code,
              name: p.nameFa,
              en: p.nameEn,
              p1: p.p1,
              p2: p.p2,
              p3: p.p3,
            }
          : r,
      );

      onRowsChange?.(next);
      if (selectedRow === pickerRowIndex) onRowSelect?.(next[pickerRowIndex]);

      return next;
    });

    setPickerOpen(false);
    setPickerRowIndex(null);
  };
  const GIVERS: Giver[] = [
    { id: "G1", name: "دهنده ۱" },
    { id: "G2", name: "دهنده ۲" },
    { id: "G3", name: "دهنده ۳" },
    { id: "G4", name: "دهنده ۴" },
  ];
  const [giverOpen, setGiverOpen] = useState(false);
  const [giverRowIndex, setGiverRowIndex] = useState<number | null>(null);

  const openGiverPickerForRow = (rowIndex: number) => {
    setGiverRowIndex(rowIndex);
    setGiverOpen(true);
  };

  const applyGiverToRow = (giver: Giver) => {
    if (giverRowIndex == null) return;

    setData((prev) => {
      const next = prev.map((r, i) =>
        i === giverRowIndex
          ? { ...r, unit: giver.id, unitName: giver.name }
          : r,
      );

      onRowsChange?.(next);
      if (selectedRow === giverRowIndex) onRowSelect?.(next[giverRowIndex]);
      return next;
    });

    setGiverOpen(false);
    setGiverRowIndex(null);
  };

  return (
    <>
      <div dir="rtl" className="h-[400px] w-full">
        <div className="h-[400px] rounded-[3px] bg-white">
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
                {data.map((r, idx) => {
                  const isSelected = selectedRow === idx;

                  return (
                    <tr
                      key={String(r.row ?? idx)}
                      className={
                        isSelected
                          ? "bg-blue-50"
                          : idx % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/50"
                      }
                    >
                      <td className="border-b border-l border-slate-200 p-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRow(idx);
                            onRowSelect?.(r);
                          }}
                          className={[
                            "block h-full w-full",
                            "min-h-5",
                            isSelected ? "bg-blue-600" : "bg-[#4f78b8]",
                            "hover:bg-blue-500",
                          ].join(" ")}
                          aria-label="Select row"
                        />
                      </td>

                      {COLS.map((c) => {
                        const isRO = !!colMap.get(c.key)?.readOnly;
                        return (
                          <td
                            key={c.key}
                            className="border-b border-l border-slate-200 p-0"
                          >
                            <input
                              className={
                                cellInputCls + (isRO ? " text-slate-600" : "")
                              }
                              value={String(r[c.key] ?? "")}
                              readOnly={isRO}
                              onClick={() => {
                                if (c.key === "code" || c.key === "name")
                                  openPickerForRow(idx);

                                if (c.key === "unit" || c.key === "unitName")
                                  openGiverPickerForRow(idx);
                              }}
                              onChange={(e) => {
                                if (isRO) return;
                                if (
                                  c.key === "code" ||
                                  c.key === "name" ||
                                  c.key === "unit" ||
                                  c.key === "unitName"
                                )
                                  return;
                                setCell(idx, c.key, e.target.value);
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductPickerModal
        open={pickerOpen}
        title="انتخاب کالا"
        items={products}
        onClose={() => {
          setPickerOpen(false);
          setPickerRowIndex(null);
        }}
        onSelect={applyProductToRow}
      />
      <GiverPickerModal
        open={giverOpen}
        items={GIVERS}
        onClose={() => {
          setGiverOpen(false);
          setGiverRowIndex(null);
        }}
        onSelect={applyGiverToRow}
      />
    </>
  );
}

const cellInputCls =
  "h-5 w-full bg-transparent px-2 text-slate-800 outline-none truncate " +
  "focus:bg-white focus:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.5)]";
