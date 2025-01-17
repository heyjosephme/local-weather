import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Posts from "./components/posts.tsx";
import WeatherApp from "./components/WeatherApp.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  </StrictMode>,
);
