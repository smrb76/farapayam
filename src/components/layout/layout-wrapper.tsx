import { Outlet } from "react-router";
import { LazyWrapper } from "./lazy-wrapper";

export const LayoutWrapper = () => (
  <LazyWrapper>
    <Outlet />
  </LazyWrapper>
);
