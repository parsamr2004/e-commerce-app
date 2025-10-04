import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import light_auth from "../../assets/images/light_auth.png";
import dark_auth from "../../assets/images/dark-auth.png";

const RegisterPage = () => {
  return (
    <div className="flex justify-between max-[1120px]:flex-col max-[1120px]:w-full gap-10">
      <form action="">
        <div className="flex flex-col gap-5">
          <span className="font-bold text-2xl">ورود</span>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">نام</Label>
            <Input
              className="w-full min-[1120px]:w-[530px]"
              placeholder="نام خود را وارد نمایید"
              type="email"
            ></Input>
          </div>
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
          <div className="flex flex-col gap-3">
            <Label>تکرار رمزعبور</Label>
            <Input
              className="w-full min-[1120px]:w-[530px]"
              placeholder="رمزعبور خود را دوباره وارد نمایید"
              type="text"
            ></Input>
          </div>
          <Button className="w-fit">ورود</Button>
        </div>

        <div className="mt-3">
          <p>
            عضو هستید ؟ <span className="text-primary">ورود</span>
          </p>
        </div>
      </form>

      <div className="max-[1120px]:h-[380px]">
        <img
          src={light_auth}
          alt="light_auth"
          className="w-full h-full object-cover dark:hidden rounded-xl"
        />
        <img
          src={dark_auth}
          alt="dark_auth"
          className="w-full h-full object-cover hidden dark:block rounded-xl"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
