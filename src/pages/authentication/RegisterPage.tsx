import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dark_auth from "../../assets/images/dark-auth.png";
import light_auth from "../../assets/images/light_auth.png";
import { toast } from "sonner";
import type { RegisterPayload } from "@/types/register.model";
import useRegister from "@/hooks/use-register";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";

const RegisterPage = () => {
  const [payload, setPayload] = useState<RegisterPayload>({
    username: "",
    email: "",
    password: "",
    confirm_Password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate } = useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!payload.username || !payload.email || !payload.password || !payload.confirm_Password) {
      toast.error("لطفا تمامی فیلد ها را پر کنید");
      return;
    }
    if (payload.password !== payload.confirm_Password) {
      toast.error("رمز عبور با تکرار رمز عبور مطابقت ندارد");
      return;
    }
    mutate(payload);
  };

  const strength =
    !payload.password
      ? 0
      : Math.min(
          4,
          (Number(payload.password.length >= 8) +
            Number(/[A-Z]/.test(payload.password)) +
            Number(/[a-z]/.test(payload.password)) +
            Number(/\d/.test(payload.password)) +
            Number(/[^A-Za-z0-9]/.test(payload.password))) - 1
        );

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="order-2 rounded-3xl border bg-card/70 backdrop-blur-sm lg:order-1">
          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-bold sm:text-3xl">ساخت حساب کاربری</h1>
              <p className="text-sm text-muted-foreground">برای شروع اطلاعات زیر را تکمیل کنید</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">نام</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="نام خود را وارد نمایید"
                    value={payload.username}
                    onChange={(e) => setPayload((p) => ({ ...p, username: e.target.value }))}
                    autoComplete="username"
                    className="pr-10"
                  />
                  <User className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

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
                  />
                  <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="حداقل ۸ کاراکتر"
                      value={payload.password}
                      onChange={(e) => setPayload((p) => ({ ...p, password: e.target.value }))}
                      autoComplete="new-password"
                      className="pr-10"
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
                  <div className="mt-2 h-1 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-full rounded bg-primary transition-all"
                      style={{
                        width: `${(strength / 4) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">تکرار رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="رمز عبور را تکرار کنید"
                      value={payload.confirm_Password}
                      onChange={(e) =>
                        setPayload((p) => ({ ...p, confirm_Password: e.target.value }))
                      }
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label="نمایش تکرار رمز"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  با ثبت‌نام شما قوانین و حریم خصوصی را می‌پذیرید
                </p>
                <Button type="submit" className="w-full sm:w-auto">
                  ثبت نام
                </Button>
              </div>

              <p className="mt-2 text-center text-sm">
                حساب دارید؟{" "}
                <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                  ورود
                </Link>
              </p>
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
              <h3 className="text-lg font-bold sm:text-xl">به فروشگاه ما خوش آمدید</h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                با ساخت حساب، تجربه خرید سریع‌تر و پیگیری سفارش‌ها را داشته باشید
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">تحویل سریع</p>
                </div>
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">پشتیبانی ۲۴/۷</p>
                </div>
                <div className="rounded-xl border bg-card/70 p-3 text-center">
                  <p className="text-xs font-medium">تخفیف‌های ویژه</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

