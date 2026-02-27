import { useLayoutEffect, useRef, useState } from 'react';
import { Button, ButtonProps, CircularProgress, styled } from '@mui/material';
import { CSSObject, PaletteColor } from '@mui/material/styles';

interface CustomButtonProps extends ButtonProps {
  bgcolor?: string;
  textcolor?: string;
  fontSize?: string;
  loading?: boolean;
  circularLoadingSize?: number;
  /** اگر مقدار بدی، ارتفاع همیشه ثابت می‌مونه و اندازه‌گیری انجام نمی‌شه */
  fixedHeight?: number;
}

type PaletteColorKey = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const DISABLED_BG = '#1C1B1F1F';
const DISABLED_FG = 'rgba(28, 27, 31, 0.52)';

const CustomizeButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !['bgcolor', 'textcolor', 'fontSize', 'loading', 'fixedHeight'].includes(prop as string),
})<CustomButtonProps>(({
  theme,
  bgcolor,
  textcolor = 'white',
  fontSize,
  variant = 'contained',
  color = 'primary',
}): CSSObject => {
  const pal = theme.palette[color as PaletteColorKey] as PaletteColor;
  const main = bgcolor ?? pal.main;
  const contrast = textcolor ?? pal.contrastText;

  const base: CSSObject = {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '10px 18px',
    fontSize: fontSize || '14px',
    textTransform: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.btn-content.hidden': { opacity: 0 }, // 👈 layout حفظ میشه ولی دیده نمیشه

    '.btn-spinner': {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    },

    // disabled look
    '&&.Mui-disabled': {
      backgroundColor: DISABLED_BG,
      color: DISABLED_FG,
      borderColor: DISABLED_BG,
      boxShadow: 'none',
      cursor: 'default',
    },

    '&&[data-loading="true"]': {
      backgroundColor: DISABLED_BG,
      color: DISABLED_FG,
      borderColor: DISABLED_BG,
      boxShadow: 'none',
      '&:hover': { backgroundColor: DISABLED_BG },
    },
  };

  const variants: Record<NonNullable<ButtonProps['variant']>, CSSObject> = {
    contained: {
      backgroundColor: main,
      color: contrast,
      '&:hover': { backgroundColor: bgcolor ? `${bgcolor}AA` : pal.dark },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: main,
      border: `1px solid ${main}`,
      '&:hover': { backgroundColor: theme.palette.action.hover },
    },
    text: {
      backgroundColor: bgcolor ?? 'transparent',
      color: color,
      '&:hover': { backgroundColor: theme.palette.action.hover },
    },
  };

  return { ...base, ...variants[variant] };
});

export default function CustomButton({
  circularLoadingSize = 15,
  loading = false,
  fixedHeight,
  children,
  className,
  ...props
}: CustomButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [measuredH, setMeasuredH] = useState<number | null>(null);

  // فقط وقتی لودینگ نیست اندازه بگیر
  useLayoutEffect(() => {
    if (!btnRef.current || loading || fixedHeight) return;

    const el = btnRef.current;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      // گرد کردن برای جلوگیری از پرش‌های ساب‌پیکسل
      setMeasuredH(Math.round(h));
    };

    update();

    // اندازه‌گیری واکنشی (اگر فونت/متن تغییر کنه)
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [loading, fixedHeight]);

  const lockH = fixedHeight ?? measuredH ?? undefined;

  return (
    <CustomizeButton
      {...props}
      ref={btnRef}
      className={className}
      data-loading={loading ? 'true' : undefined}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      // در لودینگ قفل کن؛ بیرون لودینگ به استایل عادی برگرد
      style={{
        ...(loading && lockH ? { height: lockH, minHeight: lockH } : null),
        // مطمئن شو box-sizing لحاظ شده
        boxSizing: 'border-box',
        ...(props.style || {}),
      }}
    >
      <span className={`btn-content ${loading ? 'hidden' : ''}`}>{children}</span>

      {loading && (
        <CircularProgress
          size={circularLoadingSize}
          className="btn-spinner"
          sx={{ color: 'currentColor' }}
        />
      )}
    </CustomizeButton>
  );
}
