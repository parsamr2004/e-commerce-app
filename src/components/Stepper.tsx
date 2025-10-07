import { Check } from "lucide-react";

const Stepper = () => {
  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className="mt-2 text-[var(--color-success)] text-sm">
            خلاصه خرید
          </span>
          <div className="w-3 h-3  bg-[var(--color-success)] flex items-center justify-center text-white mt-3">
            <Check size={12} />
          </div>
        </div>

        <div className="h-1 w-30 bg-[var(--color-success)] mx-4 mt-4 "></div>

        <div className="flex flex-col items-center">
          <span className="mt-2 text-[var(--color-success)] text-sm">آدرس</span>
          <div className="w-3 h-3  bg-[var(--color-success)] flex items-center justify-center text-white mt-3">
            <Check size={12} />
          </div>
        </div>

        <div className="h-1 w-30 bg-[var(--color-success)] mx-4 mt-4"></div>

        <div className="flex flex-col items-center">
          <span className="mt-2 text-[var(--color-success)] text-sm">ورود</span>
          <div className="w-3 h-3  bg-[var(--color-success)] flex items-center justify-center text-white mt-3">
            <Check size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
