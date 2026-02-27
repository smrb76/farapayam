import { useMemo, useRef, useState } from 'react';
import JalaliDatePickerField from '../../../../components/jalali-date-picker-field';
import { WAREHOUSES } from '../mock-warehouses/mock-warehouses';
const toFaDigits = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
type Props = {
  warehouseId: string;
  onWarehouseChange: (id: string) => void;
};
export default function ReceiptBar({ warehouseId, onWarehouseChange }: Props) {
  const warehouseName = useMemo(
    () => WAREHOUSES.find((w) => w.id === warehouseId)?.name ?? '',
    [warehouseId],
  );
  const [receiptDate, setReceiptDate] = useState('');
  const [receiptTime, setReceiptTime] = useState(':');
  const timeRef = useRef<HTMLInputElement | null>(null);

  return (
    <div dir="rtl" className="w-full bg-[#ddecff] py-1 pr-1">
      <div className="flex flex-row gap-0.5 text-[13px]">
        <div className="flex flex-col items-end justify-center gap-0.5">
          <Field className="col-span-6" label="انـــبـــار">
            <select
              value={warehouseId}
              onChange={(e) => onWarehouseChange(e.target.value)}
              className="flex h-6 w-24 items-center justify-center border border-gray-600 text-[12px]"
            >
              <option value="w1">انبار شماره ۱</option>
              <option value="w2">انبار شماره ۲</option>
              <option value="w3">انبار شماره ۳</option>
            </select>
          </Field>
          <Field className="col-span-6" label="سریال">
            <div className="flex items-center gap-1">
              <input className={inputCls} placeholder="" />
            </div>
          </Field>
          <Field className="col-span-4" label="کد حساب">
            <input className={inputCls} placeholder="" />
          </Field>
          <Field className="col-span-4" label="تحویل گیرنده">
            <input
              className="h-5 w-24 border border-gray-600 bg-stone-500 px-2 text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder=""
              readOnly
            />
          </Field>
        </div>
        <div className="flex flex-col items-start justify-around gap-0.5">
          <img src="static/icons/Download-Square--Streamline-Sharp.svg" className="h-5" />
          <input type="checkbox" className="h-4 w-4 rounded-none accent-blue-600" />
          <img src="static/icons/Download-Square--Streamline-Sharp.svg" className="h-5" />
          <span
            className="inline-block h-5 w-5 bg-gray-400"
            style={{
              WebkitMask: `url("static/icons/Download-Square--Streamline-Sharp (1).svg") no-repeat center / contain`,
              mask: `url("static/icons/Download-Square--Streamline-Sharp (1).svg") no-repeat center / contain`,
            }}
          />
        </div>
        <div className="flex flex-col items-end justify-center gap-0.5">
          <input
            className="h-5 w-52 border-2 border-gray-400 bg-transparent p-1.5 text-[12px] text-blue-900"
            value={warehouseName}
            readOnly
          />
          <div className="flex items-center gap-[120px]">
            <label className="flex select-none items-center">
              <span className="text-blue-900">رسید مستقیم</span>
            </label>
            <span
              className="inline-block h-5 w-5 bg-gray-400"
              style={{
                WebkitMask: `url("static/icons/Download-Square--Streamline-Sharp (1).svg") no-repeat center / contain`,
                mask: `url("static/icons/Download-Square--Streamline-Sharp (1).svg") no-repeat center / contain`,
              }}
            />
          </div>
          <input className="h-5 w-52 border-2 border-gray-400 bg-transparent" value="" readOnly />
          <input className="h-5 w-52 border-2 border-gray-400 bg-transparent" value="" readOnly />
        </div>
        <div className="flex flex-col items-end justify-center gap-0.5">
          <Field className="col-span-5" label="نــوع رســـیـد">
            <select className="h-5 w-44 border border-gray-600 text-[12px]">
              <option>رسید انتقالی غیر همزمان</option>
              <option>رسید ۲</option>
              <option>رسید ۳</option>
            </select>
          </Field>
          <Field className="col-span-3" label="شـــماره ارجـاع">
            <input className="h-5 w-[176px] border border-gray-600" placeholder="1530" />
          </Field>
          <Field className="col-span-4" label="شماره درخواست">
            <input className="h-5 w-[176px] border border-gray-600" placeholder="" />
          </Field>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">تسویه وجه:</span>
            <div className="h-4 w-8 rounded border border-slate-300 bg-blue-700" />

            <Field className="col-span-5" label="نقد">
              <select className={selectCls}>
                <option></option>
                <option>رسید مستقیم</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-0.5">
          <Field className="col-span-4" label="تـاریـخ رسـیـد">
            <JalaliDatePickerField
              value={receiptDate}
              onChange={setReceiptDate}
              className={inputCls}
              placeholder=""
            />
          </Field>
          <Field className="col-span-4" label="تاریخ درخواست">
            <input className={inputCls} placeholder="" />
          </Field>
          <Field className="col-span-4" label="شـمـاره سـنـد">
            <input className={inputCls} placeholder="" />
          </Field>
          <Field className="col-span-4" label="تاریخ میلادی">
            <input className={inputCls} placeholder="" />
          </Field>
        </div>
        <div className="relative mt-0.5 flex h-5 items-center justify-center border border-gray-600 bg-white px-1 py-2">
          <span className="mr-1 text-[12px] text-slate-800">
            {receiptTime ? toFaDigits(receiptTime) : ''}
          </span>
          <input
            ref={timeRef}
            type="time"
            step={60}
            value={receiptTime}
            onChange={(e) => {
              setReceiptTime(e.target.value);
              requestAnimationFrame(() => timeRef.current?.blur());
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onKeyDown={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex flex-col items-end justify-center gap-0.5">
          <Field className="col-span-4" label="شماره فـاکـتـور">
            <input className="h-5 w-[123px] border border-gray-600" placeholder="" />
          </Field>

          <Field className="col-span-4" label="محل اقدام خرید">
            <input className="h-5 w-[123px] border border-gray-600" placeholder="" />
          </Field>

          <Field className="col-span-5" label="ش کنترل کیفی">
            <select className={selectCls}>
              <option></option>
              <option>رسید مستقیم</option>
            </select>
          </Field>
          <Field className="col-span-5" label="سامانه مودیان">
            <select className={selectCls}>
              <option></option>
              <option>رسید مستقیم</option>
            </select>
          </Field>
        </div>
      </div>
      <div className="mr-1 flex flex-row items-center gap-4 text-[13px]">
        <Field className="col-span-5" label="حوزه عملکرد">
          <select className="flex h-6 w-32 items-center justify-center border border-gray-600 bg-gray-300 text-[12px] text-gray-800">
            <option>انبار و فروش</option>
            <option>خرید</option>
          </select>
        </Field>
        <Field className="col-span-5" label="حوزه مالی">
          <select className="flex h-6 w-32 items-center justify-center border border-gray-600 bg-gray-300 text-[12px] text-gray-800">
            <option>تکدانه</option>
            <option> قهقهه</option>
            <option> چی توز</option>
          </select>
        </Field>

        <Field className="col-span-6 mr-6" label="بارکد کالا">
          <div className="flex items-center">
            <span
              className="inline-block h-7 w-7 bg-gray-400"
              style={{
                WebkitMask: `url("static/icons/Triangle-Down-Square--Streamline-Sharp-Streamline-Material-Free.svg") no-repeat center / contain`,
                mask: `url("static/icons/Triangle-Down-Square--Streamline-Sharp-Streamline-Material-Free.svg") no-repeat center / contain`,
              }}
            />
            <input className="w-[293px] border border-gray-600" placeholder="" />
            <img src="static/icons/Download-Square--Streamline-Sharp.svg" className="h-6" />
            <img src="static/icons/Download-Square--Streamline-Sharp.svg" className="h-6" />
          </div>
        </Field>
        <div className="mr-8 flex flex-row justify-center">
          <Field className="col-span-5" label="تاریخ موثر">
            <select className={selectCls}>
              <option> </option>
              <option>رسید مستقیم</option>
            </select>
          </Field>
          <input className="h-5 w-6 border border-gray-500 bg-white" value="" readOnly />
          <p>روز</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <span className="whitespace-nowrap text-blue-900">{label}:</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

const inputCls =
  'h-5 w-24  border border-gray-600 bg-white px-2 text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200';
const selectCls =
  'h-5 w-[123px]  border border-gray-600 bg-white px-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200';
