import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <AppHeader />

      <div className="app-layout__body">
        <Sidebar />

        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
