import { Link } from "react-router";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <PageHeader
        eyebrow="Error 404"
        title="Página no encontrada"
        description="La dirección solicitada no existe dentro de TaskFlow."
      />

      <ContentPanel>
        <div className="not-found-page__content">
          <p className="not-found-page__message">
            Comprueba la dirección o vuelve al resumen de la aplicación.
          </p>

          <Link className="page-action" to="/">
            Volver al resumen
          </Link>
        </div>
      </ContentPanel>
    </div>
  );
}

export default NotFoundPage;
