"use client";
import setJWT from "@/actions/setJwt";
import signin from "@/actions/signin";
import signup from "@/actions/signup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
const Auth = ({ loginMode }: { loginMode: string }) => {
  const router = useRouter();
  const [currentError, setCurrentError] = useState<string>("");
  const [IsSendingData, setIsSendigData] = useState<boolean>(false);
  const queryClient = useQueryClient();

  async function handleFormSubmit(formData: FormData) {
    setIsSendigData(true);
    if (loginMode === "signin") {
      const result: actionsResponse = await signin(formData);
      if (result.ok) {
        await setJWT(result.user?.email!);
        router.push("/");
      } else {
        setCurrentError(result.message);
      }
    }
    if (loginMode === "signup") {
      const result: actionsResponse = await signup(formData);
      if (result.ok) {
        await setJWT(result.user?.email!);
        router.push("/");
        setIsSendigData(false);
      } else {
        setIsSendigData(false);
        setCurrentError(result.message);
      }
    }
    await queryClient.invalidateQueries({ queryKey: ["user"] });
  }
  return (
    <section>
      <h1>پروژه در حال تکمیل شدن است...</h1>
      <h1>
        برای دسترسی به بخش ادمین باید با ایمیل admin@gmail.com و پسورد 123456
        وارد شوید
      </h1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-40 md:mt-0 ">
        <a href="#" className="flex items-center mb-6 text-2xl gap-x-2">
          <FaCar />
          تیزرو
        </a>
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-white/10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              {loginMode === "signin"
                ? " وارد حساب کاربری خود شوید"
                : "حساب کاربری خود را بسازید"}
            </h1>
            <form className="space-y-4 md:space-y-6" action={handleFormSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" bg-white/5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  رمز
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" bg-white/5  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button className="w-full text-center bg-white/5 hover:bg-white/10 rounded h-10">
                {loginMode === "signin" ? "ورود" : "ایجاد حساب"}
              </button>
              <p className="text-sm font-light text-gray-200">
                {loginMode === "signin"
                  ? " هنوز حسابی ندارید؟"
                  : "حساب کاربری دارید؟"}{" "}
                <a
                  href={
                    loginMode === "signin"
                      ? "/login?mode=signup"
                      : "/login?mode=signin"
                  }
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {IsSendingData ? (
                    <p>در حال بررسی</p>
                  ) : loginMode === "signin" ? (
                    "ایجاد حساب"
                  ) : (
                    "وارد شوید"
                  )}
                </a>
              </p>
            </form>
          </div>
          <div className="text-red-500 bg-white/10 rounded p-2 full mx-4 mb-1 ">
            {currentError}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Auth;
