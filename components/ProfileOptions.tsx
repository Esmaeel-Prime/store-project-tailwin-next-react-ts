import Image from "next/image";
import Link from "next/link";
import defaultLogo from "@/public/images/defalutLogo.jpg";
import { logout } from "@/actions/logout";
import { useQueryClient } from "@tanstack/react-query";
import { AuthUserType } from "@/actions/authenicate";
import { useState } from "react";

export type ProfileOptionParamsType = {
  user: AuthUserType | undefined;
};

export const ProfileOptions = ({ user }: ProfileOptionParamsType) => {
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const queryClient = useQueryClient();

  function handleProfileClick() {
    setIsProfileOn((prev) => !prev);
  }

  async function handleLogout() {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }

  return (
    <div className="gap-x-2 relative z-30 cursor-pointer">
      <div
        className={`${user ? "block" : "hidden"} w-10 h-10`}
        onClick={handleProfileClick}
      >
        <Image
          className="rounded-full"
          src={defaultLogo.src}
          width={50}
          height={50}
          alt="profile"
        />
      </div>

      <div
        className={`${
          isProfileOn ? undefined : "hidden"
        } absolute left-[10%] top-[150%] bg-sky-900 w-40 p-2 flex-col rounded  [&>*]:mx-auto [&>*]:bg-white/5 [&>*]:w-full [&>*:hover]:bg-sky-800 [&>*]:p-1`}
      >
        <div className="text-sm block sm:hidden">{user?.email}</div>
        <button className="text-center" onClick={handleLogout}>
          خروج
        </button>
        <div
          className={`${
            user?.isAdmin ? undefined : "hidden"
          } hover:bg-sky-700/40 rounded p-1 h-full content-center text-center `}
        >
          <Link href={"/dashboard"}>داشبورد</Link>
        </div>
        <div className="text-center">
          <Link href={"/account"}>حساب کاربری</Link>
        </div>

        {user?.isAdmin && (
          <div hidden={user?.isAdmin} className="text-center">
            <Link href={"/account/pm"}>پیام به پشتیبانی</Link>
          </div>
        )}
      </div>
    </div>
  );
};
