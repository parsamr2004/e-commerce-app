import Stepper from "@/components/Stepper";
import { useLocation, Outlet } from "react-router";

const ShoppingProgress = () => {
  const { pathname } = useLocation();

  let currentStep = 1;
  if (pathname.endsWith("/address")) currentStep = 2;
  if (pathname.endsWith("/summary")) currentStep = 3;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border bg-background/80 p-3 backdrop-blur md:sticky md:top-4">
        <Stepper currentStep={currentStep} />
      </div>

      <div className="rounded-2xl border bg-card p-4 sm:p-6">
        <Outlet />
      </div>
    </section>
  );
};

export default ShoppingProgress;
