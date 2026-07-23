import { Link } from "react-router";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function NotFoundPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Error 404"
        title="Página no encontrada"
        description="La dirección solicitada no existe dentro de TaskFlow."
      />

      <ContentPanel>
        <p>Comprueba la dirección o vuelve al resumen de la aplicación.</p>

        <Link to="/">Volver al resumen</Link>
      </ContentPanel>
    </div>
  );
}

export default NotFoundPage;
