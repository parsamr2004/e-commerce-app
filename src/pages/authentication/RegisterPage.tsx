import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dark_auth from "../../assets/images/dark-auth.png";
import light_auth from "../../assets/images/light_auth.png";
import { useState, type FormEvent } from "react";
import type { RegisterPayload } from "@/types/register.model";
import { Link } from "react-router";
import { toast } from "sonner";
import useRegister from "@/hooks/use-register";

const RegisterPage = () => {
  const [payload, setPayload] = useState<RegisterPayload>({
    username: "",
    email: "",
    password: "",
    confirm_Password: "",
  });

  const { mutate } = useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!payload.username || !payload.email || !payload.password || !payload.confirm_Password) {
      toast.error("لطفا تمامی فیلد ها را پر کنید");
    } else {
      if (payload.password !== payload.confirm_Password) {
        toast.error("رمز عبور با تکرار رمز عبور مطابقت ندارد");
      } else {
        mutate(payload);
      }
    }
  };

  return (
    <div className="flex justify-between gap-10 max-[1120px]:w-full max-[1120px]:flex-col">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-5">
          <span className="text-2xl font-bold">ورود</span>
          <div className="flex flex-col gap-3">
            <Label htmlFor="username">نام</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, username: e.target.value })}
              defaultValue={payload.username}
              id="username"
              className="w-full min-[1120px]:w-[530px]"
              placeholder="نام خود را وارد نمایید"
              type="text"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, email: e.target.value })}
              defaultValue={payload.email}
              id="email"
              className="w-full min-[1120px]:w-[530px]"
              placeholder="ایمیل خود را وارد نمایید"
              type="email"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, password: e.target.value })}
              defaultValue={payload.password}
              id="password"
              className="w-full min-[1120px]:w-[530px]"
              placeholder="رمز عبور خود را وارد نمایید"
              type="password"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="confirm_password">تکرار رمز عبور</Label>
            <Input
              onChange={(e) => setPayload({ ...payload, confirm_Password: e.target.value })}
              defaultValue={payload.confirm_Password}
              id="confirm_password"
              className="w-full min-[1120px]:w-[530px]"
              placeholder="رمز عبور خود را دوباره وارد نمایید"
              type="password"
            ></Input>
          </div>
          <Button type="submit" className="w-fit">
            ثبت نام
          </Button>
        </div>

        <div className="mt-3">
          <p>
            عضو هستید ؟{" "}
            <Link to="/login" className="text-primary">
              ورود
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

export default RegisterPage;
