import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dark_auth from "../../assets/images/dark-auth.png";
import light_auth from "../../assets/images/light_auth.png";
import useLogin from "@/hooks/use-login";
import type { LoginPayload } from "@/types/login.model";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const [payload, setPayload] = useState<LoginPayload>({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!payload.email || !payload.password) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    mutate(payload);
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="order-2 rounded-3xl border bg-card/70 backdrop-blur-sm lg:order-1">
          <form onSubmit={handleSubmit} className="p-5 sm:p-8" noValidate>
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold sm:text-3xl">ورود به حساب</h1>
              <p className="text-sm text-muted-foreground">اطلاعات ورود خود را وارد کنید</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="ایمیل خود را وارد نمایید"
                    value={payload.email}
                    onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
                    autoComplete="email"
                    className="pr-10"
                    required
                  />
                  <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد نمایید"
                    value={payload.password}
                    onChange={(e) => setPayload((p) => ({ ...p, password: e.target.value }))}
                    autoComplete="current-password"
                    className="pr-10"
                    required
                  />
                  <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label="نمایش رمز"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  حساب ندارید؟{" "}
                  <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                    ثبت‌نام
                  </Link>
                </p>
                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                  {isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> در حال ورود...
                    </span>
                  ) : (
                    "ورود"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-3xl border">
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src={light_auth}
                alt="light_auth"
                className="absolute inset-0 h-full w-full object-cover dark:hidden"
                loading="lazy"
              />
              <img
                src={dark_auth}
                alt="dark_auth"
                className="absolute inset-0 hidden h-full w-full object-cover dark:block"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
              <h3 className="text-lg font-bold sm:text-xl">خوش آمدید</h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                وارد شوید و خرید خود را ادامه دهید
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">ورود سریع</p>
                </div>
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">امن و مطمئن</p>
                </div>
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">پیگیری سفارش</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

