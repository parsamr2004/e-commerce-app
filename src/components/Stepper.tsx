import { Check } from "lucide-react";

export interface StepperProps {
  currentStep: number; // 1-based
}

const steps = ["ورود", "آدرس", "خلاصه خرید"];

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div
      dir="rtl"
      className="w-full overflow-x-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      aria-label="پیشرفت خرید"
    >
      <div className="mx-auto flex w-max items-center justify-center gap-0 sm:gap-1 md:gap-2">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div
              key={step}
              className="flex items-center justify-center gap-0 sm:gap-1 md:gap-2"
            >
              {/* هر Step */}
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "border-[var(--color-success)] bg-[var(--color-success)]"
                        : isActive
                        ? "border-[var(--color-success)] bg-background"
                        : "border-[var(--muted-foreground)] bg-background"
                    }
                    h-6 w-6 sm:h-8 sm:w-8
                  `}
                >
                  {isCompleted && (
                    <Check
                      size={14}
                      className="text-background transition-transform duration-200"
                    />
                  )}
                </div>
                <p
                  className={`mt-2 text-[10px] sm:text-sm md:text-base font-medium transition-colors ${
                    isCompleted || isActive
                      ? "text-[var(--color-success)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {step}
                </p>
              </div>

              {/* خط بین مراحل */}
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 sm:mx-3 md:mx-4 h-[2px] rounded-full transition-all duration-300
                    ${
                      stepNum < currentStep
                        ? "bg-[var(--color-success)]"
                        : "bg-[var(--muted-foreground)]"
                    }
                    w-10 sm:w-16 md:w-28 lg:w-36
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;



