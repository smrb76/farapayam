import { useEffect, useMemo, useState } from "react";

function formatFaDate(d: Date) {
  return d.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatFaTime(d: Date) {
  return d.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function StatusRow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const dateText = useMemo(() => formatFaDate(now), [now]);
  const timeText = useMemo(() => formatFaTime(now), [now]);

  return (
    <div className="mt-2 flex items-center justify-between px-2 pt-2 desk:mt-3.5 desk:pt-0 w-full">
      {/* راست: تاریخ */}

      {/* وسط: وضعیت */}
      <p className=" text-xs">
        <span> وضعیت فرم: </span>
        نمایش
      </p>
      <div className="flex gap-2">
        <p className="text-xs text-slate-700 tabular-nums">{timeText}</p>

        <p className="text-xs text-slate-700 tabular-nums">{dateText}</p>
      </div>
    </div>
  );
}
