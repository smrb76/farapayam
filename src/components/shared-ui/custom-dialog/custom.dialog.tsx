import { ReactNode, useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import './custom-dialog.scss';

const defaultStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  pb: 3,
  pr: 3,
  pl: 3,
  borderRadius: '12px',
};
export default function CustomDialog({
  open,
  onClose,
  children,
  headerTitle,
  bodyTxt,
  style,
  childrenClassName,
}: {
  open: boolean;
  onClose: (event: object, reason: string) => void;
  children: ReactNode;
  headerTitle?: ReactNode | string;
  bodyTxt?: ReactNode | string;
  style?: object;
  childrenClassName?: string;
}) {
  const styles = style ? { ...defaultStyles, ...style } : defaultStyles;
  useEffect(() => {
    if (open) {
      window.history.replaceState({ dialog: true }, '');
    }

    const handlePopState = () => {
      if (open) {
        onClose({}, 'backdropClick');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [open, onClose]);
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus={true} disableRestoreFocus={true}>
      <Box sx={styles}>
        {headerTitle && (
          <div className="mb-4 mt-4 text-right text-lg font-semibold text-zinc-800">
            {headerTitle}
          </div>
        )}
        {bodyTxt && <div className="my-4">{bodyTxt}</div>}
        <div className={childrenClassName ? childrenClassName : 'flex justify-end'}>{children}</div>
      </Box>
    </Modal>
  );
}
