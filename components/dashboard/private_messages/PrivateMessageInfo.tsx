"use client";

import getUserById from "@/actions/getUserById";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardState } from "@/store/dashboard/dashboardSlice";

const PrivateMessageInfo = ({
  userPrivateMessage,
}: {
  userPrivateMessage: SenderPrivateMessagesType;
}) => {
  const [userEmail, setUserEmail] = useState<string>();
  const rout = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function getUserEmail() {
      const user: UserType | undefined = await getUserById(
        userPrivateMessage.senderId,
      );
      setUserEmail(user?.email);
    }
    if (!userEmail) {
      getUserEmail();
    }
  }, []);
  const unSeenMessagesCount = userPrivateMessage.sentPrivateMessages.filter(
    (item) => item.seen === false,
  ).length;
  return (
    <li className="w-[90vw] h-fit rounded mx-auto bg-black/10 p-5 block sm:flex space-y-2 jusbe items-center gap-x-4 ">
      <div
        className="bg-green-300/10 p-1 rounded cursor-pointer"
        onClick={() =>
          dispatch(
            setDashboardState({
              state: "chat",
              destinationId: userPrivateMessage.senderId,
            }),
          )
        }
      >
        <div
          className={`${
            unSeenMessagesCount === 0
              ? "bg-gray-500 text-white"
              : "bg-blue-500 text-white"
          } rounded-full  mb-2 text-center  w-6  h-6 `}
        >
          {unSeenMessagesCount}
        </div>
        <CgProfile className="w-8 h-8" />
        <p>{userEmail}</p>
      </div>
      <p className=" truncate flex-3">
        {
          userPrivateMessage.sentPrivateMessages[
            userPrivateMessage.sentPrivateMessages.length - 1
          ].text
        }
        ...
      </p>
    </li>
  );
};
export default PrivateMessageInfo;
