import { Suspense } from "react";
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
          <Suspense fallback={<p role="status">Cargando sección...</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
