import {
  type RouteConfig,
  route,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./routes/about.tsx"),
  route("contact", "./routes/contact.tsx"),
  route("experiences", "./routes/experiences.tsx"),
  route("projects", "./routes/projects.tsx"),
] satisfies RouteConfig;
