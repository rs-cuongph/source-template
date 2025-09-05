import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/default.tsx", [
    index("./pages/home.tsx"),
    route("/post", "./pages/post.tsx"),
    // Catch-all route for unknown paths (optional)
    route("*", "./pages/not-found.tsx"),
  ]),
] satisfies RouteConfig;
