import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PostHogProvider } from "posthog-js/react";

const apiHost = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST;
const apiKey = import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY;


const options = {
  api_host: apiHost,
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={apiKey}
      options={options}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
