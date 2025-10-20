import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dark_auth from "../../assets/images/dark-auth.png";
import light_auth from "../../assets/images/light_auth.png";
import { useState, type FormEvent } from "react";
import useLogin from "@/hooks/use-login";
import type { LoginPayload } from "@/types/login.model";
import { LucideLoader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

const LoginPage = () => {
  const [payload, setPayload] = useState<LoginPayload>({ email: "", password: "" });

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (payload.email && payload.password) {
      mutate(payload);
    } else {
      toast.error("لطفا تمامی فیلد ها را پر کنید");
    }
  };

  return (
    <div className="flex justify-between gap-10 max-[1120px]:w-full max-[1120px]:flex-col">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-5">
          <span className="text-2xl font-bold">ورود</span>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, email: e.target.value })}
              defaultValue={payload.email}
              className="w-full min-[1120px]:w-[530px]"
              placeholder="ایمیل خود را وارد نمایید"
              type="email"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label>رمز عبور</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, password: e.target.value })}
              defaultValue={payload.password}
              className="w-full min-[1120px]:w-[530px]"
              placeholder="رمز عبور خود را وارد نمایید"
              type="password"
            ></Input>
          </div>
          <Button disabled={isPending} type="submit" className="w-fit">
            ورود
            {isPending && <LucideLoader2 className="animate-spin" />}
          </Button>
        </div>

        <div className="mt-3">
          <p>
            عضو نیستید ؟{" "}
            <Link to="/register" className="text-primary">
              ثبت نام
            </Link>
          </p>
        </div>
      </form>

      <div className="max-[1120px]:h-[380px]">
        <img
          src={light_auth}
          alt="light_auth"
          className="h-full w-full rounded-xl object-cover dark:hidden"
        />
        <img
          src={dark_auth}
          alt="dark_auth"
          className="hidden h-full w-full rounded-xl object-cover dark:block"
        />
      </div>
    </div>
  );
};

export default LoginPage;
