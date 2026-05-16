"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPieChart } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaReceipt } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Add from "@/components/dashboard/add/Add";
import Link from "next/link";
import Edit from "@/components/dashboard/edit/Edit";
import { BiMessage } from "react-icons/bi";
import { RootState, AppDispatch } from "@/store/store";
import { setDashboardState } from "@/store/dashboard/dashboardSlice";
import PrivateMessageChat from "./private_messages/PrivateMessageChat";

interface DashboardProps {
  children: React.ReactNode;
  order: React.ReactNode;
  privateMessage: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  order,
  privateMessage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboardState = useSelector((state: RootState) => state.products);

  let pageContent = <>{order}</>;
  switch (dashboardState.dashboardState) {
    case "order":
      pageContent = <>{order}</>;
      break;
    case "add":
      pageContent = <Add />;
      break;
    case "edit":
      pageContent = <Edit />;
      break;
    case "chart":
      pageContent = <>{children}</>;
      break;
    case "PM":
      pageContent = <>{privateMessage}</>;
      break;
    case "chat":
      pageContent = (
        <PrivateMessageChat destinationId={dashboardState.destinationId} />
      );
    default:
      break;
  }

  return (
    <section>
      <div className="m-1 bg-white/30 w-fit rounded-full p-2">
        <Link href={"/"}>صفحه اصلی</Link>
      </div>
      <div>
        <div className="w-screen">{pageContent}</div>
        <div className=" fixed">
          <div className="fixed bottom-0 text-center flex justify-evenly items-center bg-white/20 w-screen h-16">
            <div className="flex-1 border-l-[1px] h-full">
              <button
                onClick={() =>
                  dispatch(
                    setDashboardState({
                      state: "chart",
                      destinationId: dashboardState.destinationId,
                    }),
                  )
                }
                className={`${
                  dashboardState.dashboardState === "chart"
                    ? "bg-black/20"
                    : undefined
                } hover:bg-black/10 h-full w-full flex justify-center items-center`}
              >
                <BsPieChart />
              </button>
            </div>
            <div className="flex-1 border-l-[1px] h-full">
              <button
                onClick={() =>
                  dispatch(
                    setDashboardState({
                      state: "add",
                      destinationId: dashboardState.destinationId,
                    }),
                  )
                }
                className={`${
                  dashboardState.dashboardState === "add"
                    ? "bg-black/20"
                    : undefined
                } hover:bg-black/10 h-full w-full flex justify-center items-center`}
              >
                <CgAdd className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 border-l-[1px] h-full">
              <button
                onClick={() =>
                  dispatch(
                    setDashboardState({
                      state: "order",
                      destinationId: dashboardState.destinationId,
                    }),
                  )
                }
                className={`${
                  dashboardState.dashboardState === "order"
                    ? "bg-black/20"
                    : undefined
                } hover:bg-black/10 h-full w-full flex justify-center items-center`}
              >
                <FaReceipt />
              </button>
            </div>
            <div className="flex-1 border-l-[1px] h-full">
              <button
                onClick={() =>
                  dispatch(
                    setDashboardState({
                      state: "edit",
                      destinationId: dashboardState.destinationId,
                    }),
                  )
                }
                className={`${
                  dashboardState.dashboardState === "edit"
                    ? "bg-black/20"
                    : undefined
                } hover:bg-black/10 h-full w-full flex justify-center items-center`}
              >
                <FaEdit />
              </button>
            </div>
            <div className="flex-1 h-full">
              <button
                onClick={() =>
                  dispatch(
                    setDashboardState({
                      state: "PM",
                      destinationId: dashboardState.destinationId,
                    }),
                  )
                }
                className={`${
                  dashboardState.dashboardState === "PM"
                    ? "bg-black/20"
                    : undefined
                } hover:bg-black/10 h-full w-full flex justify-center items-center`}
              >
                <BiMessage />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
