import { createBrowserRouter } from "react-router";
import App from "./App";
import Layout from "./Layout";
import createProductPage from "./pages/admin/createProductPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import CartPage from "./pages/user/CartPage";
import FavoritesPage from "./pages/user/FavoritePage";
import ProductPage from "./pages/user/ProductPage";
import ShopPage from "./pages/user/ShopPage";
import PrivateRoutes from "./privateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "products/:id",
        Component: ProductPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "shop",
        Component: ShopPage,
      },
      {
        path: "createproduct",
        Component: createProductPage,
      },
      {
        Component: PrivateRoutes,
        children: [
          {
            path: "favorites",
            Component: FavoritesPage,
          },
          {
            path: "cart",
            Component: CartPage,
          },
        ],
      },
    ],
  },
]);

export default router;
