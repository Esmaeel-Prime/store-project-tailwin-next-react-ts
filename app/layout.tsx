"use client";
import React from "react";
import "./globals.css";
import { NotificationContextProvider } from "@/components/notification-context/NotificationProvider";
import Notification from "@/components/utils/Notification";
import { Provider } from "react-redux";
import { store } from "@/store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <html className="font-tanha" dir="rtl">
      <body id="body">
        <QueryClientProvider client={queryClient}>
          <NotificationContextProvider>
            <Provider store={store}>{children}</Provider>
            <Notification />
          </NotificationContextProvider>
        </QueryClientProvider>
        <div id="how"></div>
      </body>
    </html>
  );
};

export default layout;
