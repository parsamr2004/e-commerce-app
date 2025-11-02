import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUpdateProfile from "@/hooks/use-profile";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";
import type { ProfilePayload } from "@/types/profile.model";

const ProfilePage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: updateProfile, isLoading } = useUpdateProfile() as any;
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارد");
      return;
    }
    const formValue: ProfilePayload = { username, email, password };
    updateProfile(formValue, {
      onSuccess: () => {
        toast("پروفایل با موفقیت بروزرسانی شد!");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      },
      onError: (error: any) => {
        toast.error("خطا در بروزرسانی پروفایل: " + (error.message || "مشکل نامشخص"));
      },
    });
  };

  const handleMyOrderNavigate = () => navigate("/orders");

  useEffect(() => {
    if (profile) {
      setUserName(profile.username || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={submitForm}
        className="w-full rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
        dir="rtl"
      >
        <h2 className="mb-6 text-right text-xl font-bold sm:text-2xl">بروزرسانی پروفایل</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-1">
            <label htmlFor="name" className="mb-2 block text-sm">
              نام کاربری
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={username}
              onChange={handleUserNameChange}
              placeholder={profile?.username || "نام کاربری"}
              autoComplete="username"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="email" className="mb-2 block text-sm">
              ایمیل
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={profile?.email || "example@email.com"}
              autoComplete="email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="password" className="mb-2 block text-sm">
              رمزعبور
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="رمزعبور خود را وارد نمایید"
              autoComplete="new-password"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="confirmPassword" className="mb-2 block text-sm">
              تکرار رمزعبور
            </label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="تکرار رمزعبور خود را وارد نمایید"
              autoComplete="new-password"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleMyOrderNavigate}
            className="w-full rounded-xl border px-6 py-2 text-sm transition-colors sm:w-auto"
          >
            سفارشات من
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary px-6 py-2 text-sm text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isLoading ? "در حال بروزرسانی..." : "بروزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

