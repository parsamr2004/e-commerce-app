import { createBrowserRouter } from "react-router";
import App from "./App";
import Layout from "./Layout";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import CartPage from "./pages/user/CartPage";
import FavoritesPage from "./pages/user/FavoritePage";
import ProductPage from "./pages/user/ProductPage";
import ShopPage from "./pages/user/ShopPage";
import ProfilePage from "./pages/user/ProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import PrivateRoutes from "./PrivateRoutes";

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
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "shop",
        Component: ShopPage,
      },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "favorites",
        Component: FavoritesPage,
      },
      {
        path: "MyOrders",
        Component: UserOrdersPage,
      },
      {
        path: "createproduct",
        Component: CreateProductPage,
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
