import type { RenderingStrategyId } from "./renderingStrategies";

export interface RenderingImpact {
  strategyId: RenderingStrategyId;
  strategy: string;
  searchVisibility: string;
  firstVisit: string;
  freshness: string;
  clientJavaScript: string;
  developmentExperience: string;
}

export const renderingImpacts: RenderingImpact[] = [
  {
    strategyId: "csr",
    strategy: "CSR",
    searchVisibility:
      "Requiere comprobar cómo rastreadores y previsualizadores procesan el JavaScript.",
    firstVisit:
      "El contenido principal puede esperar al bundle y a las peticiones del navegador.",
    freshness: "Muy alta para datos consultados al abrir la pantalla.",
    clientJavaScript:
      "La interfaz depende ampliamente del código enviado al navegador.",
    developmentExperience:
      "Modelo directo cuando frontend y API se despliegan por separado.",
  },
  {
    strategyId: "ssr",
    strategy: "SSR",
    searchVisibility:
      "El contenido de la URL puede llegar dentro del HTML inicial.",
    firstVisit:
      "Evita esperar al renderizado completo en cliente, pero depende del servidor.",
    freshness: "Puede calcularse en cada petición.",
    clientJavaScript:
      "Las zonas interactivas continúan necesitando hidratación.",
    developmentExperience:
      "Añade código y restricciones que deben funcionar en servidor y navegador.",
  },
  {
    strategyId: "ssg",
    strategy: "SSG",
    searchVisibility: "Entrega HTML preparado para cada ruta generada.",
    firstVisit:
      "Puede servirse rápidamente desde archivos estáticos o una CDN.",
    freshness: "Depende de volver a construir y desplegar.",
    clientJavaScript:
      "Solo es imprescindible para las zonas que necesiten interacción.",
    developmentExperience:
      "Flujo predecible cuando rutas y datos se conocen durante el build.",
  },
  {
    strategyId: "isr",
    strategy: "ISR",
    searchVisibility:
      "Mantiene páginas prerenderizadas que pueden actualizarse.",
    firstVisit: "Normalmente sirve una versión estática ya disponible.",
    freshness: "Depende de la política de revalidación.",
    clientJavaScript:
      "Similar a una página prerenderizada con zonas hidratadas.",
    developmentExperience:
      "Exige comprender caché, revalidación y comportamiento del runtime.",
  },
  {
    strategyId: "streaming",
    strategy: "Streaming",
    searchVisibility:
      "El shell y las regiones resueltas llegan como HTML del servidor.",
    firstVisit: "Permite mostrar partes listas sin esperar a las más lentas.",
    freshness: "Depende de los datos utilizados durante la petición.",
    clientJavaScript:
      "Las regiones interactivas siguen necesitando código en cliente.",
    developmentExperience:
      "Requiere boundaries y estados de carga pensados para una respuesta progresiva.",
  },
];
