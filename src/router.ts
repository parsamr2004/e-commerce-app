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
import { Dashboard } from "./pages/admin/Dashboard";
import ShoppingProgress from "./pages/user/ShoppingProgress";
import ShoppingProgressForm from "./pages/user/ShoppingProgressFormPage";
import ShoppingProgressListPage from "./pages/user/ShoppingProgressListPage";
import ErrorPage from "./pages/ErrorPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import DetailsPage from "./pages/user/DetailsPage";

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
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "products/:id",
        Component: ProductPage,
      },
      {
        path: "shop",
        Component: ShopPage,
      },
      {
        path: "dashboard",
        Component: Dashboard,
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
          {
            path: "profile",
            Component: ProfilePage,
          },

          {
            path: "create-product",
            Component: CreateProductPage,
          },
          {
            path: "shopping-progress",
            Component: ShoppingProgress,
            children: [
              { path: "address", Component: ShoppingProgressForm },
              { path: "summary", Component: ShoppingProgressListPage },
            ],
          },
          { path: "checkout", Component: CheckoutPage },
          {
            path: "orders",
            children: [
              { index: true, Component: UserOrdersPage },
              { path: ":orderId", Component: DetailsPage },
            ],
          },
        ],
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
