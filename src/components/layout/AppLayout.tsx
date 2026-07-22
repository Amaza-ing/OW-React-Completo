import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <AppHeader />

      <div className="app-layout__body">
        <Sidebar />

        <main className="app-layout__content">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
