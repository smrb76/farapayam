import React, { useState, forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { CLUB_DEFAULT_PLACEHOLDER } from '../../../constants/global.constant';
import { getProperImage } from '../../../utils/sharedUtils';

type SmartImageProps = {
  src: string | null | undefined;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: string;
  placeholder?: React.ReactNode;
  sizes?: string;
  srcSetBuilder?: (src: string) => string;
  bluryPlaceHolder?: boolean;
};

const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(
  (
    {
      src,
      alt = '',
      width,
      height,
      className,
      style,
      fallback = CLUB_DEFAULT_PLACEHOLDER,
      placeholder,
      sizes = '100vw',
      bluryPlaceHolder = false,
    },
    ref,
  ) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(!src);

    const srcSet = useMemo(() => {
      if (!src || !/cdn/i.test(src)) return undefined;
      const breakpoints = [width, 320, 480, 768, 1024, 1440, 1920];
      return breakpoints.map((bp) => `${getProperImage(src, String(bp))} ${bp}w`).join(', ');
    }, [src]);

    const showFallback = error || !src;

    return (
      <div
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: typeof width === 'number' ? `${width}px` : (width ?? '100%'),
          height: typeof height === 'number' ? `${height}px` : (height ?? '100%'),
          filter: !loaded && bluryPlaceHolder ? 'blur(10px)' : 'blur(0)',
          ...style,
        }}
      >
        {!loaded &&
          !showFallback &&
          (placeholder ?? (
            <div
              className={clsx('h-full w-full animate-pulse rounded border bg-gray-200', {
                'opacity-20 blur-md': bluryPlaceHolder,
              })}
            />
          ))}

        <img
          ref={ref}
          src={showFallback ? fallback : (src ?? '')}
          srcSet={showFallback ? undefined : srcSet}
          sizes={showFallback ? undefined : sizes}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 300ms ease',
            display: 'block',
          }}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
        />
      </div>
    );
  },
);

export default SmartImage;
