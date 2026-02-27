import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { LazyWrapper } from './lazy-wrapper';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const LayoutWrapper = ({ noHeader = false }: { noHeader?: boolean }) => (
  <LazyWrapper>
    <Outlet />
  </LazyWrapper>
);
