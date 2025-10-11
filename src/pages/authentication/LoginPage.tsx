import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dark_auth from "../../assets/images/dark-auth.png";
import light_auth from "../../assets/images/light_auth.png";

const LoginPage = () => {
  return (
    <div className="flex justify-between gap-10 max-[1120px]:w-full max-[1120px]:flex-col">
      <form action="">
        <div className="flex flex-col gap-5">
          <span className="text-2xl font-bold">ورود</span>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              className="w-full min-[1120px]:w-[530px]"
              placeholder="ایمیل خود را وارد نمایید"
              type="email"
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <Label>رمزعبور</Label>
            <Input
              className="w-full min-[1120px]:w-[530px]"
              placeholder="رمزعبور خود را وارد نمایید"
              type="text"
            ></Input>
          </div>
          <Button className="w-fit">ورود</Button>
        </div>

        <div className="mt-3">
          <p>
            عضو نیستید ؟ <span className="text-primary">ثبت نام</span>
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
