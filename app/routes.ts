import {
  type RouteConfig,
  index,
  route,
  prefix
} from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("query", "routes/query.tsx"),
  route("other-page", "routes/other-page.tsx")
] satisfies RouteConfig
