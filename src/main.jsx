import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// import("preline");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <main className="forestgreen text-textColor bg-background">
          <App />
          {/* <script src="../node_modules/preline/dist/preline.js"></script> */}
        </main>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
