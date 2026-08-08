import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects/layout.tsx", [
    index("routes/projects/index.tsx"),
    route(":projectId", "routes/projects/detail.tsx"),
  ]),
] satisfies RouteConfig;
