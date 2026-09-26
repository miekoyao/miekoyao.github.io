import {
  type RouteConfig,
  route,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./app.tsx"),
  // route("about", "./routes/about.tsx"),
  // route("contact", "./routes/contact.tsx"),
  // route("experience", "./routes/experience.tsx"),
  // route("projects", "./routes/projects.tsx"),
] satisfies RouteConfig;
