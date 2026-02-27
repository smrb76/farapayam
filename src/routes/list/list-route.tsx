import ListDesktop from "./components/list-desktop";
import ListMobile from "./components/list-mobile";

export default function ListRoute({
  onOpenList,
}: {
  onOpenList: (id: string) => void;
}) {
  return (
    <>
      <div className="desk:hidden">
        <ListMobile onOpenList={onOpenList} />
      </div>
      <div className="hidden desk:block">
        <ListDesktop onOpenList={onOpenList} />
      </div>
    </>
  );
}
