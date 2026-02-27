import React, { useMemo } from "react";
type Row = Record<string, string | number>;
type RowT = Record<string, string | number>;

type Props = {
  rows?: RowT[];
  selectedRow?: Row | null;
  readonly?: {
    sumAmount?: string;
    sumExtras?: string;
    sumCost?: string;
    sumDiscounts?: string;
    payable?: string;
  };
};

const toNumber = (v: unknown) => {
  const s = String(v ?? "").trim();
  if (!s) return 0;
  const faToEn = s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/,/g, "");
  const n = Number(faToEn);
  return Number.isFinite(n) ? n : 0;
};

export default function ReceiptSummaryPanel({
  rows = [],
  selectedRow,
  readonly,
}: Props) {
  const roMoney = readonly ?? {};
  const r = selectedRow ?? {};

  const totalQty = useMemo(() => {
    return rows.reduce((sum, row) => sum + toNumber(row.qty), 0);
  }, [rows]);

  const totalAmount = useMemo(() => {
    return rows.reduce((sum, row) => {
      const t = toNumber(row.total);
      if (t) return sum + t;

      const qty = toNumber(row.qty);
      const price = toNumber(row.price);
      return sum + qty * price;
    }, 0);
  }, [rows]);

  return (
    <div
      dir="rtl"
      className="w-full border-t border-blue-300 bg-[#e7f0ff] px-3 py-2 fixed bottom-[116px]"
    >
      <div className="flex flex-row justify-start gap-10 text-[14px] text-blue-900">
        <div className="flex flex-col items-end justify-end gap-0.5">
          <Row label="ویژگی ۱:">
            <input
              className={inputEditable}
              value={String(r.p1 ?? "")}
              readOnly
            />
          </Row>
          <Row label="ویژگی ۲:">
            <input
              className={inputEditable}
              value={String(r.p2 ?? "")}
              readOnly
            />
          </Row>
          <Row label="ویژگی ۳:">
            <input
              className={inputEditable}
              value={String(r.p3 ?? "")}
              readOnly
            />
          </Row>
          <Row label="ویژگی ۴:">
            <input
              className={inputEditable}
              value={String(r.p4 ?? "")}
              readOnly
            />
          </Row>
          <Row label="حساب مرتبط:">
            <input
              className={inputEditable}
              value={String(r.code ?? "")}
              readOnly
            />
          </Row>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Row label="دهنده کالا:">
            <input
              className={inputEditableWider}
              value={String(r.unit ?? "")}
              readOnly
            />
          </Row>

          <Row label="تفصیلی ۲:">
            <input
              className={inputEditableWider}
              value={String(r.unitName ?? "")}
              readOnly
            />
          </Row>

          <Row label="تفصیلی ۳:">
            <input className={inputEditableWider} value={""} readOnly />
          </Row>

          <Row label="تفصیلی ۴:">
            <input className={inputEditableWider} value={""} readOnly />
          </Row>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Row label="واحد کالا:">
            <input
              className={inputEditable}
              value={String(r.qty ?? "")}
              readOnly
            />
          </Row>
          <Row label="جمع مقدار:">
            <input
              className={inputReadonly}
              value={String(totalQty.toLocaleString("fa-IR"))}
              readOnly
            />
          </Row>
          <Row label="جمع ارز:">
            <input className={inputReadonly} value={""} readOnly />
          </Row>
          <Row label="جمع وزن (KG):">
            <input className={inputReadonly} value={""} readOnly />
          </Row>
          <Row label="مالیات و عوارض VAT:">
            <input className={inputReadonly} value={""} readOnly />
          </Row>
        </div>

        <div className="flex flex-col items-end justify-end gap-0.5">
          <MoneyRow label="جمع مبلغ:">
            <input
              className={inputReadonly}
              value={totalAmount.toLocaleString("fa-IR")}
              readOnly
            />
          </MoneyRow>

          <MoneyRow label="جمع اضافات:">
            <input
              className={inputReadonly}
              value={roMoney.sumExtras ?? ""}
              readOnly
            />
          </MoneyRow>

          <MoneyRow label="جمع قیمت تمام‌شده:">
            <input
              className={inputReadonly}
              value={roMoney.sumCost ?? ""}
              readOnly
            />
          </MoneyRow>

          <MoneyRow label="جمع کسورات:">
            <input
              className={inputReadonly}
              value={roMoney.sumDiscounts ?? ""}
              readOnly
            />
          </MoneyRow>

          <MoneyRow label="قابل پرداخت:">
            <input
              className={inputReadonlyStrong}
              value={roMoney.payable ?? ""}
              readOnly
            />
          </MoneyRow>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-0.5">
      <span className="whitespace-nowrap">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function MoneyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] items-center gap-0.5">
      <span className="whitespace-nowrap">{label}</span>
      <div className="min-w-0">{children}</div>
      <span className="text-blue-900/80">ریال</span>
    </div>
  );
}

const base =
  "h-5 w-24 rounded-[2px] px-2 text-[12px] outline-none " +
  "border border-gray-600";
const inputEditableWider =
  "bg-white h-5 ounded-[2px] border  border-gray-600 px-2 text-[12px] outline-none text-slate-900 focus:border-gray-600 w-36";

const inputEditable = base + " bg-white text-slate-900 focus:border-slate-400";

const inputReadonly = base + " bg-transparent text-slate-900/90";

const inputReadonlyStrong =
  base + " bg-transparent font-semibold text-slate-900";
