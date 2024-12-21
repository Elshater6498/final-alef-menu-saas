import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

export default function Layout() {
  return (
    <div className="hide-scrollbar">
      <div className="sticky top-0 z-20">
        <TopNav />
      </div>
      <Outlet />
    </div>
  );
}
