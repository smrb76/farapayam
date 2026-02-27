import SpinnerLoading from "../shared-ui/spinner-loading/spinner-loading";

export type TInfiniteListProps<T> = {
  // data & query states
  items: T[];
  isInitialLoading?: boolean;   // 👈 first load state
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;

  // render
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string | number;

  // ui
  className?: string;
  emptyState?: React.ReactNode;
  errorState?: (retry: () => void) => React.ReactNode;
  loadingSkeleton?: React.ReactNode;
};

export function InfiniteList<T>({
  items,
  isInitialLoading = false,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
  renderItem,
  getItemKey,
  className,
  emptyState = (
    <div className="py-6 text-center text-sm opacity-70">
      چیزی برای نمایش نیست
    </div>
  ),
  errorState,
  loadingSkeleton = (
          <SpinnerLoading size={20} thickness={4} />

  ),
}: TInfiniteListProps<T>) {
  // Initial Loading
  if (isInitialLoading) {
    return <div className={className}>{loadingSkeleton}</div>;
  }

  // Error
  if (isError) {
    return (
      <div className={className}>
        {errorState ? (
          errorState(refetch)
        ) : (
          <div className="py-6 text-center">
            <div className="mb-3 text-sm opacity-80">خطا در بارگذاری</div>
            <button
              className="rounded-full border px-4 py-2 text-sm"
              onClick={() => refetch()}
            >
              تلاش مجدد
            </button>
          </div>
        )}
      </div>
    );
  }

  // Empty (only after first load is finished)
  if (!items?.length) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div className={className}>
      <ul className="space-y-3">
        {items.map((it, idx) => (
          <li key={getItemKey(it, idx)}>{renderItem(it, idx)}</li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center">
        {isFetchingNextPage ? (
          <div className="py-4 text-sm opacity-70">در حال بارگذاری بیشتر…</div>
        ) : hasNextPage ?? (
          <button
            className="rounded-full border px-4 py-2 text-sm"
            onClick={() => fetchNextPage()}
          >
            بارگذاری بیشتر
          </button>
        )}
      </div>
    </div>
  );
}
