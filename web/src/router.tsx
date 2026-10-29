import {
  createRouter,
  RootRoute,
  Route,
  type RouterHistory,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Index from "./routes/index";
import About from "./routes/about";
import Services from "./routes/services";
import Contact from "./routes/contact";
import Blog from "./routes/blog";
import BlogPost from "./routes/blogPost";
import Process from "./routes/process";

export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/process",
  "/blog",
  "/contact",
] as const;

export function createAppRouter(history: RouterHistory) {
  const rootRoute = new RootRoute({
    component: Layout,
  });

  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index,
  });

  const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About,
  });

  const servicesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/services",
    component: Services,
  });

  const contactRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/contact",
    component: Contact,
  });

  const blogRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/blog",
    component: Blog,
  });

  const blogPostRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/blog/$slug",
    component: BlogPost,
  });

  const processRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/process",
    component: Process,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    servicesRoute,
    contactRoute,
    blogRoute,
    blogPostRoute,
    processRoute,
  ]);

  return createRouter({ routeTree, history });
}
