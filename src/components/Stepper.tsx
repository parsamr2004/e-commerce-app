import { Check } from "lucide-react";

const Stepper = () => {
  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 transform">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className="mt-2 text-sm text-[var(--color-success)]">خلاصه خرید</span>
          <div className="mt-3 flex h-3 w-3 items-center justify-center bg-[var(--color-success)] text-white">
            <Check size={12} />
          </div>
        </div>

        <div className="mx-4 mt-4 h-1 w-30 bg-[var(--color-success)]"></div>

        <div className="flex flex-col items-center">
          <span className="mt-2 text-sm text-[var(--color-success)]">آدرس</span>
          <div className="mt-3 flex h-3 w-3 items-center justify-center bg-[var(--color-success)] text-white">
            <Check size={12} />
          </div>
        </div>

        <div className="mx-4 mt-4 h-1 w-30 bg-[var(--color-success)]"></div>

        <div className="flex flex-col items-center">
          <span className="mt-2 text-sm text-[var(--color-success)]">ورود</span>
          <div className="mt-3 flex h-3 w-3 items-center justify-center bg-[var(--color-success)] text-white">
            <Check size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
