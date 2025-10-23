import { Navigate, Outlet } from "react-router";
import useUser from "./hooks/use-user";
import Loading from "./components/Loading";

const PrivateRoutes = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
