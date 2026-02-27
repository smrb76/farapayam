import { ReactNode } from 'react';
import { Portal, Snackbar } from '@mui/material';

export default function CustomAlert({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2 fixed bottom-4 z-50">
      <Portal>
        <Snackbar open={open} onClose={onClose} autoHideDuration={3000} message={children} />
      </Portal>
    </div>
  );
}
