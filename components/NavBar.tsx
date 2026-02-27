"use client";
import { FaCar } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { getUser } from "@/actions/authenicate";
import { BiBasket } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProfileOptions } from "./ProfileOptions";

const NavBar = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getUser();
      } catch (err) {
        console.error("Query error:", err);
        throw err;
      }
    },
  });
  console.log(user, isError);
  const path = usePathname();

  return (
    <div className="flex items-center min-[641px]:justify-between max-[650px]:justify-center bg-sky-950 min-w-full max-w-fit h-30 px-2 ">
      <div className="sm:flex items-center gap-x-2 hidden">
        <FaCar className="w-10 h-10" />
        <Link href={"/"}>تیزرو</Link>
      </div>
      <div className=" flex  items-center gap-x-4">
        <div className="flex gap-x-2 sm:mx-0 py-4">
          <Link
            className={`${
              user || "hidden"
            } hover:bg-white/10 p-2 rounded bg-white/5 content-center`}
            href={"/card"}
          >
            <BiBasket />
          </Link>

          <Link
            href={"/products"}
            className={`${
              path === "/products" ? "hidden" : "block"
            } hover:bg-white/10 bg-white/5 rounded content-center p-1`}
          >
            محصولات
          </Link>

          {user && (
            <div className={"bg-white/5 rounded flex items-center h-10"}>
              <div className="h-ful hidden sm:block  content-center p-1">
                <p>{user?.email}</p>
              </div>
              {user?.isAdmin && (
                <Link
                  href={"/dashboard"}
                  className={
                    "hover:bg-white/5 border-r border-white p-1 h-full content-center"
                  }
                >
                  داشبورد
                </Link>
              )}
            </div>
          )}

          {!!user || (
            <Link
              href={"/login?mode=signin"}
              className={"bg-white/5 rounded p-1 w-20 text-center h-full"}
            >
              ورود
            </Link>
          )}
        </div>
        {user && <ProfileOptions user={user} />}
      </div>
    </div>
  );
};

export default NavBar;
