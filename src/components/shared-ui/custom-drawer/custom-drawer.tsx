import Drawer from '@mui/material/Drawer';

type BottomDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Tailwind height utility, e.g. 'h-1/2' | 'h-[60vh]' | 'h-96' */
  heightClass?: string;
  /** Extra classes for the panel */
  panelClassName?: string;
  /** Backdrop classes (e.g. blur/opacity) */
  backdropClassName?: string;
};

export function CustomBottomDrawer({
  open,
  onClose,
  children,
  footer,
  heightClass = 'h-1/2',
  panelClassName = '',
  backdropClassName = 'bg-black/30 backdrop-blur-sm',
}: BottomDrawerProps) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      ModalProps={{ BackdropProps: { className: backdropClassName } }}
      PaperProps={{
        className: [
          heightClass,
          'flex flex-col rounded-t-2xl overflow-hidden shadow-xl bg-white transition-transform',
          'w-full max-w-2xl mx-auto',
          panelClassName,
        ].join(' '),
      }}
    >
      <div className="flex justify-center py-4 opacity-40">
        <div className="h-1 w-8 rounded-full bg-[#74777F]" />
      </div>

      {/* محتوای اسکرولی */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {children}
        {!footer && <div className="h-2" />}
      </div>

      {/* فوتر ثابت پایین دراور (خارج از اسکرول) */}
      {footer && (
        <div
          className="flex-none border-t border-gray-200 bg-white px-4 py-4"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
        >
          {footer}
        </div>
      )}
    </Drawer>
  );
}
