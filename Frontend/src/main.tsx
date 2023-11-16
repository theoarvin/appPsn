import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Routes from "./Routes/Index";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/styles/index.scss";

// Ensure the root element is non-null
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="798355568674-t149r4rdtfg593ut4uc9hkahlcmso0ji.apps.googleusercontent.com">
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
