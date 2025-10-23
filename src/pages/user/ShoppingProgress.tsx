import Stepper from "@/components/Stepper";
import { useLocation, Outlet } from "react-router";

const ShoppingProgress = () => {
  const location = useLocation();

  let currentStep = 2;
  if (location.pathname.endsWith("/summary")) {
    currentStep = 3;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Stepper currentStep={currentStep} />
      <Outlet />
    </div>
  );
};

export default ShoppingProgress;
