import { useState } from 'react';
import ReceiptBar from '../receipt-bar/receipt-bar';
import ReceiptBottomToolbar from '../receipt-bottom-panel/receipt-bottom-panel';
import ReceiptScrollableTable from '../receipt-scrollable-table/receipt-scrollable-table';
import ReceiptSummaryPanel from '../receipt-summary-panel/receipt-summary-panel';
import { WAREHOUSES } from '../mock-warehouses/mock-warehouses';
const initialRows = Array.from({ length: 9 }).map((_, i) => ({ row: i + 1 }));
type SavedList = {
  id: string;
  title: string;
  createdAt: string;
  warehouseId: string;
  rows: any[];
};

const LS_KEY = 'inventory_lists_v1';

function loadLists(): SavedList[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLists(lists: SavedList[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(lists));
}
export default function HomeDesktop() {
  const handleConfirm = () => {
    const lists = loadLists();

    const nextNumber = lists.length + 1;
    const title = `لیست${nextNumber}`;
    const id = `list${nextNumber}`;

    const payload: SavedList = {
      id,
      title,
      createdAt: new Date().toISOString(),
      warehouseId,
      rows: rows.filter(
        (r) => String(r.code ?? '').trim() !== '' || String(r.name ?? '').trim() !== '',
      ),
    };

    const next = [...lists, payload];
    saveLists(next);

    // اختیاری: برای تست
    console.log('Saved:', payload);
  };
  const [activeTool, setActiveTool] = useState<string>('');
  const [warehouseId, setWarehouseId] = useState(WAREHOUSES[0].id);
  const [rows, setRows] = useState<any[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex flex-col bg-gradient-to-b from-[#9bc1fa] from-30% via-[#b7d4ff] via-55% to-[#e7f0ff] to-100%">
            <div className="flex flex-row items-end justify-start pr-2 text-[13px]">
              <div className="border-l border-blue-50 px-3 pt-2 font-medium text-white [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                ابزارهای عمومی
              </div>
              <div className="rounded-tl-lg border-l border-blue-100 bg-blue-50 px-3 pt-2 font-medium text-blue-900 [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                ابزارهای عملیاتی
              </div>
              <div className="text-white"> فرم های مرتبط</div>
            </div>

            <div className="flex flex-row items-center justify-start gap-4 border-b border-blue-300 pr-3 pt-1 text-[13px] text-slate-800">
              <div
                onClick={() => setActiveTool('factors')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'factors'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Self-Payment-Touch--Streamline-Ultimate.svg"
                  className="h-7"
                />
                <p> عوامل فاکتور</p>
              </div>
              <div
                onClick={() => setActiveTool('recall')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'recall'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img src="static/icons/Move-To-Bottom--Streamline-Ultimate.svg" className="h-7" />
                <p>فراخوانی</p>
              </div>
              <div
                onClick={() => setActiveTool('disable')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'disable'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img src="static/icons/Database-Disable--Streamline-Ultimate.svg" className="h-7" />
                <p> ابطال/احیا</p>
              </div>
              <div
                onClick={() => setActiveTool('refer')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'refer'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Road-Sign-Hairpin-Turn-Left--Streamline-Ultimate.svg"
                  className="h-7"
                />
                <p> ارجاع</p>
              </div>
              <div
                onClick={() => setActiveTool('Un-Rialized')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Un-Rialized'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Accounting-Bill-Stack-1--Streamline-Ultimate.svg"
                  className="h-7"
                />
                <p> ریالی نشده ها</p>
              </div>
              <div
                onClick={() => setActiveTool('Waybill')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Waybill'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Delivery-Truck-Cargo--Streamline-Ultimate.svg"
                  className="h-7"
                />

                <p>بارنامه و باسکول</p>
              </div>
              <div
                onClick={() => setActiveTool('Insert')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Insert'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img src="static/icons/Folder-Add--Streamline-Ultimate.svg" className="h-7" />
                <p>درج بین اسناد</p>
              </div>
              <div
                onClick={() => setActiveTool('Deleted Serials')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Deleted Serials'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Email-Action-Remove--Streamline-Ultimate.svg"
                  className="h-7"
                />
                <p> سریال های حذف شده</p>
              </div>
              <div
                onClick={() => setActiveTool('Pricing')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Pricing'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img src="static/icons/Cash-Briefcase--Streamline-Ultimate.svg" className="h-7" />
                <p> قیمت گذاری</p>
              </div>
              <div
                onClick={() => setActiveTool('Payment')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Payment'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img src="static/icons/Receipt-Dollar--Streamline-Ultimate.svg" className="h-7" />
                <p>پرداخت</p>
              </div>
              <div
                onClick={() => setActiveTool('Warranty')}
                className={[
                  'flex cursor-pointer flex-col items-center rounded px-2 py-1',
                  activeTool === 'Warranty'
                    ? 'border border-stone-400 bg-gradient-to-t from-[#fdd453] to-[#fcf9cc] py-2'
                    : 'bg-transparent',
                ].join(' ')}
              >
                <img
                  src="static/icons/Gaming-Ribbon-First--Streamline-Ultimate.svg"
                  className="h-7"
                />
                <p> صدور کارت گارانتی</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-1 bg-[#ddecff] pr-1 pt-0.5 text-[12px]">
            <div className="flex flex-row gap-0.5">
              <div className="rounded border border-gray-400 p-1 font-semibold text-slate-800">
                وضعیت : رسیدموقت
              </div>
              <div className="rounded border border-gray-400 px-3 py-1 font-semibold text-slate-800">
                ساختار ارزی فعال
              </div>
            </div>
            <div className="ml-1 flex flex-row gap-1">
              <img src="static/icons/Information-Circle--Streamline-Ultimate.svg" className="h-5" />
              <img src="static/icons/Common-File-Text--Streamline-Ultimate.svg" className="h-5" />
              <img src="static/icons/Alphabet--Streamline-Bootstrap.svg" className="h-5" />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="flex h-full min-h-0 flex-col">
              <ReceiptBar warehouseId={warehouseId} onWarehouseChange={setWarehouseId} />
              <div className="min-h-0">
                <ReceiptScrollableTable
                  rows={rows}
                  warehouseId={warehouseId}
                  onRowsChange={setRows}
                  onRowSelect={setSelectedRow}
                />
              </div>

              <ReceiptSummaryPanel selectedRow={selectedRow} />
              <ReceiptBottomToolbar onConfirm={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WinMaximizeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 7h10v10H7V7zm2 2v6h6V9H9z" />
    </svg>
  );
}

export function WinCloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29 10.59 10.6l6.3-6.31z"
      />
    </svg>
  );
}
