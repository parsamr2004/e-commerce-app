import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-muted flex h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="bg-muted mb-6 inline-flex items-center justify-center rounded-full p-4">
          <AlertTriangle className="text-destructive h-10 w-10" />
        </div>
        <h1 className="text-foreground text-4xl font-bold">خطا!</h1>
        <p className="text-muted-foreground mt-4">
          متاسفیم، صفحه‌ای که به دنبال آن هستید پیدا نشد یا مشکلی در سرور رخ داده است.
        </p>
        <Button className="mt-6" onClick={() => navigate("/")}>
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
