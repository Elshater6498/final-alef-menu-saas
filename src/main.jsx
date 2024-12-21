/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BsCheck, BsX } from "react-icons/bs";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.jsx";

import "./translation/i18n";
import "./index.css";

const queryClient = new QueryClient();

const ToasterIcons = {
  success: <BsCheck className="w-5 h-5 text-green-500 translate-y-0.5" />,
  error: <BsX className="w-5 h-5 text-red-500 translate-y-0.5" />,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster
      dir="rtl"
      position="top-center"
      className="!left-1/2 !-translate-x-1/2 [&>li]:!mx-auto"
      icons={ToasterIcons}
      theme="light"
    />
  </QueryClientProvider>
);
