import ReceiptBar from "../receipt-bar/receipt-bar";
import ReceiptScrollableTable from "../receipt-scrollable-table/receipt-scrollable-table";
import ReceiptSummaryPanel from "../receipt-summary-panel/receipt-summary-panel";

type Props = {
  resetKey: number;
  warehouseId: string;
  onWarehouseChange: (v: string) => void;

  rows: any[];
  onRowsChange: (v: any[]) => void;

  selectedRow: any;
  onRowSelect: (v: any) => void;
};

export function Factors({
  resetKey,
  warehouseId,
  onWarehouseChange,
  rows,
  onRowsChange,
  selectedRow,
  onRowSelect,
}: Props) {
  return (
    <div className="asd">
      <div className="flex flex-row items-center justify-between gap-1 bg-[#ddecff] pr-1 pt-0.5 text-[12px]">
        <div className="flex flex-row gap-0.5">
          <div className="rounded border border-gray-400 p-1 font-semibold text-slate-800">
            وضعیت : رسید موقت
          </div>
          <div className="rounded border border-gray-400 px-3 py-1 font-semibold text-slate-800">
            ساختار ارزی فعال
          </div>
        </div>
        <div className="ml-1 flex flex-row gap-1">
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

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full min-h-0 flex-col">
          <ReceiptBar
            key={resetKey}
            warehouseId={warehouseId}
            onWarehouseChange={onWarehouseChange}
          />

          <div className="min-h-0">
            <ReceiptScrollableTable
              rows={rows}
              warehouseId={warehouseId}
              onRowsChange={onRowsChange}
              onRowSelect={onRowSelect}
            />
          </div>

          <ReceiptSummaryPanel selectedRow={selectedRow} rows={rows} />
        </div>
      </div>
    </div>
  );
}
