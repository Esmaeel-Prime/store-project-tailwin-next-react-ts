"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  NotificationActionsContext,
  NotificationDisplayContext,
  notificationStateEnum,
  notificationType,
} from "../notification-context/NotificationProvider";

const Notification = () => {
  const { setNotificationState } = useContext(NotificationActionsContext);
  const { message, state } = useContext(NotificationDisplayContext);

  return (
    <div
      onClick={() =>
        setNotificationState({
          message: "",
          state: notificationStateEnum.null,
        })
      }
      className={`${
        message.length > 0 ? undefined : "hidden"
      } fixed bottom-10 animate-popup right-10 w-fit p-2 rounded text-nowrap h-20 text-center flex items-center justify-center cursor-pointer ${
        state === notificationStateEnum.success
          ? "bg-green-700"
          : state === notificationStateEnum.faild
            ? "bg-red-700"
            : "bg-blue-500"
      } ${state === notificationStateEnum.null ? "hidden" : undefined}`}
    >
      <h1 className="text-xl">{message}</h1>
    </div>
  );
};

export default Notification;
