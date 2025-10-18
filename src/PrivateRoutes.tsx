import { Navigate, Outlet } from "react-router";
import useUser from "./hooks/use-user";

const PrivateRoutes = () => {
  const { data: user } = useUser();

  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
