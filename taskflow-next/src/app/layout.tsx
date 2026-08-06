import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TaskFlow Next",
    template: "%s | TaskFlow Next",
  },
  description: "Migración progresiva de TaskFlow a Next.js con App Router.",
};

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
              <Link href="/projects">Proyectos</Link>
            </nav>
          </header>

          <main className="app-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
