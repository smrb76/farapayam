import { useEffect } from "react";
import { useRouteError } from "react-router";
import * as Sentry from "@sentry/react";

const ErrorComponent = () => {
  const error = useRouteError() as Error;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-white p-6 text-black"
    >
      <h1 className="text-3xl font-bold text-red-600">
        این صفحه هنوز پیاده سازی نشده
      </h1>
    </div>
  );
};

export default ErrorComponent;
