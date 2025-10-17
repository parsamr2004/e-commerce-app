import { useState } from "react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formvalue = { name, email, password, confirmPassword };
    console.log(formvalue);
    alert("اطلاعات شما به روزرسانی شد.");
    setName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };
  const handleMyOrderNavigate = () => {
    orderNavigat("/MyOrders");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={submitForm}
        className="w-full max-w-[640px] rounded-2xl p-8 space-y-5 border"
      >
        <h2 className="text-xl font-bold text-foreground mb-6 text-right">
          بروزرسانی پروفایل
        </h2>

        <div>
          <label htmlFor="name" className="block text-foreground mb-2 text-sm">
            نام
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="نام خود را وارد نمایید"
            className="w-full border border-input bg-card px-3 py-2 focus:outline-none rounded-md placeholder:text-secoundry"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-foreground mb-2 text-sm">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="ایمیل خود را وارد نمایید"
            className="w-full border border-input bg-card px-3 py-2 focus:outline-none rounded-md placeholder:text-secoundry"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-foreground mb-2 text-sm"
          >
            رمزعبور
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="رمزعبور خود را وارد نمایید"
            className="w-full border border-input bg-card px-3 py-2 focus:outline-none rounded-md placeholder:text-secoundry"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-foreground mb-2 text-sm"
          >
            تکرار رمزعبور
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="تکرار رمزعبور خود را وارد نمایید"
            className="w-full border border-input bg-card px-3 py-2 focus:outline-none rounded-md placeholder:text-secoundry"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl transition-colors"
          >
            بروزرسانی
          </button>
          <button
            type="button"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl transition-colors"
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
