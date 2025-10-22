import { useState } from "react";
import { useNavigate } from "react-router";
import useUpdateProfile from "@/hooks/use-update-profile";
import type { ProfilePayload } from "@/types/profile.model";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: updateProfile, isLoading } = useUpdateProfile() as any;

  const orderNavigat = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارد");
      return;
    }
    const formValue: ProfilePayload = { username: name, email, password };
    updateProfile(formValue, {
      onSuccess: () => {
        alert("پروفایل با موفقیت بروزرسانی شد!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      },
      onError: (error: any) => {
        alert("خطا در بروزرسانی پروفایل: " + (error.message || "مشکل نامشخص"));
      },
    });
  };
  const handleMyOrderNavigate = () => {
    orderNavigat("/MyOrders");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={submitForm} className="w-full max-w-[640px] space-y-5 rounded-2xl border p-8">
        <h2 className="text-foreground mb-6 text-right text-xl font-bold">بروزرسانی پروفایل</h2>

        <div>
          <label htmlFor="name" className="text-foreground mb-2 block text-sm">
            نام
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="نام خود را وارد نمایید"
            className="border-input bg-card placeholder:text-secoundry w-full rounded-md border px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-foreground mb-2 block text-sm">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="ایمیل خود را وارد نمایید"
            className="border-input bg-card placeholder:text-secoundry w-full rounded-md border px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-foreground mb-2 block text-sm">
            رمزعبور
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="رمزعبور خود را وارد نمایید"
            className="border-input bg-card placeholder:text-secoundry w-full rounded-md border px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-foreground mb-2 block text-sm">
            تکرار رمزعبور
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="تکرار رمزعبور خود را وارد نمایید"
            className="border-input bg-card placeholder:text-secoundry w-full rounded-md border px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-xl px-6 py-2 transition-colors"
            disabled={isLoading}
          >
            بروزرسانی
          </button>
          <button
            type="button"
            className="bg-primary text-primary-foreground rounded-xl px-6 py-2 transition-colors"
            onClick={handleMyOrderNavigate}
          >
            سفارشات من
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
