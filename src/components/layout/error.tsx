import { useEffect } from 'react';
// import CustomButton from '../shared-ui/custom-button/custom-button';
import { useRouteError } from 'react-router';
import * as Sentry from '@sentry/react';

const ErrorComponent = () => {
  // const [loading, setLoading] = useState(false);
  const error = useRouteError() as Error;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // const handleRetry = () => {
  //   setLoading(true);
  //   // Reload the current page
  //   location.reload();
  // };

  return (
    <div
      role="alert"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-white p-6 text-black"
    >
      <h1 className="text-3xl font-bold text-red-600">این صفحه هنوز پیاده سازی نشده</h1>
      {/* <h1 className="text-3xl font-bold text-red-600">مشکلی پیش آمده</h1>
      <p className="max-w-md text-center text-gray-700">
        متاسفانه مشکلی هنگام بارگذاری صفحه پیش آمد. لطفاً کمی صبر کنید یا دوباره تلاش کنید.
      </p>

      {loading ? (
        <div className="flex animate-pulse items-center gap-2 text-green-600">
          <span>در حال بارگذاری...</span>
        </div>
      ) : (
        <CustomButton onClick={handleRetry}>تلاش مجدد</CustomButton>
      )} */}
    </div>
  );
};

export default ErrorComponent;
