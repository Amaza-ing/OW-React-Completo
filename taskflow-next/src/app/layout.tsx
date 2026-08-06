import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import DeploymentBadge from "@/shared/components/DeploymentBadge";
import "./globals.css";

function getMetadataBase() {
  if (process.env.APP_URL !== undefined) {
    return new URL(process.env.APP_URL);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL !== undefined) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "TaskFlow Next",
    template: "%s | TaskFlow Next",
  },
  description: "Migración progresiva de TaskFlow a Next.js con App Router.",
  openGraph: {
    title: "TaskFlow Next",
    description: "Proyectos y arquitectura con Next.js.",
    type: "website",
  },
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

          <footer className="app-footer">
            <p>TaskFlow · Curso de React</p>
            <DeploymentBadge />
          </footer>
        </div>
      </body>
    </html>
  );
}
