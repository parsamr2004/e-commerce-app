import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = ["ورود", "آدرس", "خلاصه خرید"];

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 transform">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <span
                className={`mt-2 text-sm ${
                  index <= currentStep
                    ? "text-[var(--color-success)]"
                    : "text-[var(--foreground)] dark:text-[var(--foreground)]"
                }`}
              >
                {step}
              </span>
              <div
                className={`mt-3 flex h-3 w-3 items-center justify-center ${
                  index < currentStep
                    ? "bg-[var(--color-success)] text-[var(--background)]"
                    : "border border-[var(--muted-foreground)] bg-[var(--background)]"
                }`}
              >
                {index < currentStep && <Check size={12} className="text-[var(--background)]" />}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-4 mt-4 h-1 w-30 ${
                  index < currentStep ? "bg-[var(--color-success)]" : "bg-[var(--muted-foreground)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
