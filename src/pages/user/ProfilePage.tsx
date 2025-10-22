import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUpdateProfile from "@/hooks/use-profile";
import { useProfile } from "@/hooks/use-profile";
import type { ProfilePayload } from "@/types/profile.model";

const ProfilePage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: updateProfile, isLoading } = useUpdateProfile() as any;
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  console.log(profile);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
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
    const formValue: ProfilePayload = { username: username, email, password };
    updateProfile(formValue, {
      onSuccess: () => {
        alert("پروفایل با موفقیت بروزرسانی شد!");
        setUserName("");
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
    navigate("/MyOrders");
  };
  useEffect(() => {
    if (profile) {
      console.log(profile);
      setUserName(profile.username || "");
      setEmail(profile.email || "");
    }
  }, [profile]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={submitForm} className="w-full max-w-[640px] space-y-5 rounded-2xl border p-8">
        <h2 className="text-foreground mb-6 text-right text-xl font-bold">بروزرسانی پروفایل</h2>

        <div>
          <label htmlFor="name" className="text-foreground mb-2 block text-sm">
            نام کاربری
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={handleUserNameChange}
            placeholder={profile?.username}
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
            placeholder={profile?.email}
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
