import HomeDesktop from "./components/home-desktop/home-desktop";
import HomeMobile from "./components/home-mobile/home-mobile";

export default function Home() {
  return (
    <>
      <div className="desk:hidden">
        <HomeMobile />
      </div>

      <div className="hidden desk:block">
        <HomeDesktop />
      </div>
    </>
  );
}
