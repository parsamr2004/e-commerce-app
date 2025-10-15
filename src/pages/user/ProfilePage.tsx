const ProfilePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-[640px] rounded-2xl p-8 space-y-5 border">
        <h2 className="text-xl font-bold text-foreground mb-6 text-right">
          بروزرسانی پروفایل
        </h2>

        <div>
          <label className="block text-foreground mb-2 text-sm">نام</label>
          <input
            type="text"
            placeholder="نام خود را وارد نمایید"
            className="w-full border border-foreground bg-card px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-foreground mb-2 text-sm">ایمیل</label>
          <input
            type="email"
            placeholder="ایمیل خود را وارد نمایید"
            className="w-full border border-foreground rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-foreground mb-2 text-sm">رمزعبور</label>
          <input
            type="password"
            placeholder="رمزعبور خود را وارد نمایید"
            className="w-full border border-foreground rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-foreground mb-2 text-sm">
            تکرار رمزعبور
          </label>
          <input
            type="password"
            placeholder="تکرار رمزعبور خود را وارد نمایید"
            className="w-full border border-foreground rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-400"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition-colors"
          >
            بروزرسانی
          </button>
          <button
            type="button"
            className="border border-pink-600 text-pink-600 px-6 py-2 rounded-xl hover:bg-pink-50 transition-colors"
          >
            سفارشات من
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
