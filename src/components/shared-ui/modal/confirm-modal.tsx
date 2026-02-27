import { useEffect } from "react";

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "تایید",
  cancelText = "انصراف",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  // بستن با ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="close"
        onClick={onCancel}
      />

      {/* dialog */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-[420px] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded border border-[#8aa6c8] bg-white shadow-xl">
          <div className="border-b border-[#8aa6c8] bg-gradient-to-b from-[#f7f9fe] to-[#d9e5f6] px-4 py-2">
            <div className="text-sm font-bold text-slate-800">{title}</div>
          </div>

          <div className="px-4 py-4">
            <p className="text-[13px] leading-6 text-slate-700">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
            <button
              type="button"
              onClick={onCancel}
              className="h-9 rounded border border-[#8aa6c8] bg-[#E1E1E1] px-4 text-[12px] font-semibold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:brightness-105 active:brightness-95"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="h-9 rounded border border-red-600 bg-red-600 px-4 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-105 active:brightness-95"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
