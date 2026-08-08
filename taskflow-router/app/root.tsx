import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="app-header__brand" to="/">
          TaskFlow Router
        </NavLink>

        <nav
          className="app-header__navigation"
          aria-label="Navegación principal"
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "app-header__link app-header__link--active"
                : "app-header__link"
            }
            end
            to="/"
          >
            Inicio
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "app-header__link app-header__link--active"
                : "app-header__link"
            }
            to="/projects"
          >
            Proyectos
          </NavLink>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Error inesperado";
  let message = "No se ha podido mostrar esta pantalla.";

  if (isRouteErrorResponse(error)) {
    title =
      error.status === 404 ? "Página no encontrada" : `Error ${error.status}`;

    message = typeof error.data === "string" ? error.data : error.statusText;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="error-page">
      <p className="page__eyebrow">TaskFlow Router</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <NavLink className="button-link" to="/">
        Volver al inicio
      </NavLink>
    </main>
  );
}
