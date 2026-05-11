"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NotificationActionsContext,
  NotificationDisplayContext,
  notificationStateEnum,
} from "../notification-context/NotificationProvider";

const Notification = () => {
  const { setNotificationState } = useContext(NotificationActionsContext);
  const { message, state } = useContext(NotificationDisplayContext);
  const [notificationData, setNotificationData] = useState<{
    message: string;
    state: notificationStateEnum;
    shouldDisplay: boolean;
  }>({ message, state, shouldDisplay: false });
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (
      state === notificationStateEnum.null &&
      notificationData.shouldDisplay
    ) {
      timerRef.current = setTimeout(() => {
        setNotificationData({
          message: "",
          state: notificationStateEnum.null,
          shouldDisplay: false,
        });
      }, 280);
    }

    if (
      state !== notificationStateEnum.null &&
      !notificationData.shouldDisplay
    ) {
      setNotificationData({ message, state, shouldDisplay: true });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, message, notificationData.shouldDisplay]);

  return (
    notificationData.shouldDisplay && (
      <div
        onClick={() =>
          setNotificationState({
            message: "",
            state: notificationStateEnum.null,
          })
        }
        className={`fixed bottom-10 ${state === notificationStateEnum.null ? "animate-popdown" : "animate-popup"}  right-10 w-fit p-2 rounded text-nowrap h-10 text-center flex items-center justify-center cursor-pointer ${
          notificationData.state === notificationStateEnum.success
            ? "bg-green-700"
            : notificationData.state === notificationStateEnum.failed
              ? "bg-red-700"
              : "bg-blue-500"
        }`}
      >
        <h1 className="text-xl">{notificationData.message}</h1>
      </div>
    )
  );
};

export default Notification;
