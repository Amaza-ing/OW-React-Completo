import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <Link className="app-header__brand" href="/">
              TaskFlow Next
            </Link>

            <nav aria-label="Navegación principal">
              <Link href="/">Inicio</Link>
              <Link href="/architecture">Arquitectura</Link>
            </nav>
          </header>

          <main className="app-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
