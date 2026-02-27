import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./error";
import SpinnerLoading from "../shared-ui/spinner-loading/spinner-loading";

export const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary fallback={<ErrorComponent />}>
    <Suspense fallback={<SpinnerLoading />}>{children}</Suspense>
  </ErrorBoundary>
);
