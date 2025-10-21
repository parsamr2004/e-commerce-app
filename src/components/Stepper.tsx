import { Check } from "lucide-react";

export interface StepperProps {
  currentStep: number;
}

const steps = ["ورود", "آدرس", "خلاصه خرید"];

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="fixed top-10 left-1/2 flex -translate-x-1/2 items-center gap-5">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <p
              className={`text-sm ${
                index <= currentStep
                  ? "text-[var(--color-success)]"
                  : "text-[var(--foreground)] dark:text-[var(--foreground)]"
              }`}
            >
              {step}
            </p>

            <div
              className={`flex h-4 w-4 items-center justify-center border-2 ${
                index < currentStep
                  ? "border-[var(--color-success)] bg-[var(--color-success)]"
                  : index === currentStep
                    ? "border-[var(--color-success)] bg-[var(--background)]"
                    : "border-[var(--muted-foreground)] bg-[var(--background)]"
              }`}
            >
              {index < currentStep && <Check size={12} className="text-[var(--background)]" />}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`mx-2 h-1 w-40 ${
                index < currentStep ? "bg-[var(--color-success)]" : "bg-[var(--muted-foreground)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
