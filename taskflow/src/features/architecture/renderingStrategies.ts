export const renderingStrategyIds = [
  "csr",
  "ssr",
  "ssg",
  "isr",
  "streaming",
] as const;

export type RenderingStrategyId = (typeof renderingStrategyIds)[number];

export interface RenderingStrategy {
  id: RenderingStrategyId;
  name: string;
  generatedAt: string;
  initialResponse: string;
  freshness: string;
  infrastructure: string;
  suitableFor: string;
}

export const renderingStrategies: RenderingStrategy[] = [
  {
    id: "csr",
    name: "Client-Side Rendering",
    generatedAt: "En el navegador",
    initialResponse: "Un documento base y los scripts de la aplicación.",
    freshness: "Los datos se solicitan cuando se ejecuta la interfaz.",
    infrastructure: "Hosting estático y las APIs que necesite el producto.",
    suitableFor:
      "Paneles privados, herramientas internas y aplicaciones muy interactivas.",
  },
  {
    id: "ssr",
    name: "Server-Side Rendering",
    generatedAt: "En cada petición",
    initialResponse: "HTML generado para la URL y la petición actuales.",
    freshness: "Puede reflejar los datos disponibles al recibir la petición.",
    infrastructure: "Un entorno de servidor capaz de renderizar React.",
    suitableFor:
      "Contenido público, personalizado o dependiente de la petición.",
  },
  {
    id: "ssg",
    name: "Static Site Generation",
    generatedAt: "Durante el build",
    initialResponse: "Archivos HTML creados antes del despliegue.",
    freshness: "Permanece igual hasta generar y desplegar un nuevo build.",
    infrastructure: "Hosting estático o CDN.",
    suitableFor: "Documentación, páginas informativas y contenido estable.",
  },
  {
    id: "isr",
    name: "Incremental Static Regeneration",
    generatedAt: "En build y mediante revalidaciones posteriores",
    initialResponse:
      "HTML estático que puede regenerarse sin reconstruir todo el sitio.",
    freshness: "Se actualiza según una política de revalidación.",
    infrastructure: "Un framework y un runtime capaces de regenerar contenido.",
    suitableFor:
      "Catálogos y contenido público que cambia con cierta frecuencia.",
  },
  {
    id: "streaming",
    name: "Streaming",
    generatedAt: "Durante la petición, por partes",
    initialResponse:
      "Primero llega el shell y después se completan regiones pendientes.",
    freshness:
      "Cada región puede resolverse cuando sus datos estén disponibles.",
    infrastructure:
      "Un servidor o runtime compatible con respuestas progresivas.",
    suitableFor:
      "Pantallas con zonas rápidas y lentas que no deben bloquearse entre sí.",
  },
];
