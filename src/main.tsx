import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CartPage from "./pages/user/CartPage";
// import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <CartPage />
  </StrictMode>
);
