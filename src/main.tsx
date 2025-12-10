import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import axios from "axios";
import { env } from "@/config/env";

axios.defaults.baseURL = env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.replace("/signin");
      localStorage.clear();
      sessionStorage.clear();
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
