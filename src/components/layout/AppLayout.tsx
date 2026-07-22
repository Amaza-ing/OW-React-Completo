import type { ReactNode } from "react";
import type { ViewName } from "../../types/navigation";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

type AppLayoutProps = {
  children: ReactNode;
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
};

function AppLayout({ children, activeView, onNavigate }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <AppHeader onNavigate={onNavigate} />

      <div className="app-layout__body">
        <Sidebar activeView={activeView} onNavigate={onNavigate} />

        <main className="app-layout__content">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
