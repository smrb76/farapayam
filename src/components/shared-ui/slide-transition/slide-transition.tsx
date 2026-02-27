'use client';

import Slide from '@mui/material/Slide';
import type { SlideProps } from '@mui/material/Slide';

export function SlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
