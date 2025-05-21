import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PostHogProvider } from "posthog-js/react";
import { 
  RouterProvider, 
  createRouter, 
  Route, 
  RootRoute,
} from '@tanstack/react-router';

import Index from "./routes/index";
import About from "./routes/about";
import Layout from './components/Layout';
import Services from './routes/services';

import './index.css';
import Contact from './routes/contact';
import Blog from './routes/blog';
import Process from './routes/process';

// *POST HOG* //
const apiHost = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST;
const apiKey = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY;
const options = {
  api_host: apiHost,
}

//** Router */
const rootRoute = new RootRoute({
  component: () => <Layout />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const servicesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact
});

const blogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: Blog
})

const processRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/process',
  component: Process
})

const routeTree = rootRoute.addChildren([
  indexRoute, 
  aboutRoute, 
  servicesRoute,
  contactRoute,
  blogRoute,
  processRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={apiKey}
      options={options}
    >
      <RouterProvider router={router} />
    </PostHogProvider>
  </StrictMode>
);
