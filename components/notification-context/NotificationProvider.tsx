"use client";
import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";

export type notificationType = {
  message: string;
  state: notificationStateEnum;
};

export enum notificationStateEnum {
  success = 0,
  faild = 1,
  pending = 2,
  null = 3,
}

export type NotificationDisplayContextType = {
  message: string;
  state: notificationStateEnum;
};

export type NotificationActionsContextType = {
  setNotificationState: (params: {
    message: string;
    state: notificationStateEnum;
  }) => void;
};

const initialDisplayValue: NotificationDisplayContextType = {
  message: "در حال انجام",
  state: notificationStateEnum.null,
};

export const NotificationDisplayContext =
  createContext<NotificationDisplayContextType>(initialDisplayValue);

const dummySetNotification: NotificationActionsContextType["setNotificationState"] =
  () => {};

export const NotificationActionsContext =
  createContext<NotificationActionsContextType>({
    setNotificationState: dummySetNotification,
  });

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationState, setNotificationState] = useState<notificationType>({
    message: "",
    state: notificationStateEnum.null,
  });
  const timerIdRef = useRef<NodeJS.Timeout>();

  const handleSetNotification = useCallback(
    ({ message, state }: { message: string; state: notificationStateEnum }) => {
      setNotificationState({ message: "", state: notificationStateEnum.null });
      setNotificationState({ message: message, state: state });
      timerIdRef.current = setTimeout(() => {
        setNotificationState({
          message: "",
          state: notificationStateEnum.null,
        });
      }, 3000);
    },
    [],
  );

  const ctxDisplayValue = useMemo<NotificationDisplayContextType>(
    () => ({
      message: notificationState.message,
      state: notificationState.state,
    }),
    [notificationState],
  );

  // Memoize the Actions Value: The function reference is stable due to useCallback.
  const ctxActionsValue = useMemo<NotificationActionsContextType>(
    () => ({
      setNotificationState: handleSetNotification,
    }),
    [handleSetNotification],
  );

  return (
    <NotificationDisplayContext.Provider value={ctxDisplayValue}>
      <NotificationActionsContext.Provider value={ctxActionsValue}>
        {children}
      </NotificationActionsContext.Provider>
    </NotificationDisplayContext.Provider>
  );
};
