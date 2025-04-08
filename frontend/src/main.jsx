import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Authprovider } from "./Context/Authprovider.jsx";
import { SongProvider } from "./Context/Songs.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Authprovider>
      <SongProvider>
      <App />
      </SongProvider>
    </Authprovider>
  </BrowserRouter>
);
