import { LucideLoader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-3">
      <LucideLoader2 className="size-5 animate-spin" />
      <p className="text-muted-foreground animate-pulse text-sm">لطفا کمی صبر کنید...</p>
    </div>
  );
};

export default Loading;