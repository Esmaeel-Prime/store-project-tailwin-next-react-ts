"use client";
import addOrder from "@/actions/addOrder";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

const Purchase = ({ product }: { product: productType }) => {
  const [isAddingOrder, setIsAddingOrder] = useState<boolean>(false);
  const purchaseButtonRef = useRef<HTMLButtonElement>(null);
  const { setNotificationState } = useContext(NotificationActionsContext);
  const client = useQueryClient();
  function handlePurchaseClick() {
    setIsAddingOrder((prev) => !prev);
  }
  async function handleAddOrder() {
    setNotificationState({
      message: "در حال بررسی",
      state: notificationStateEnum.pending,
    });
    const user: UserType | undefined = client.getQueryData(["user"]);

    if (!user) {
      setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.failed,
      });
      setIsAddingOrder((prev) => false);
      return;
    }

    if (
      user.orders?.some((order: orderType) => order.productId === product._id)
    ) {
      setNotificationState({
        message: "قبلا این کالا را انتخاب کرده‌اید به سبد سفارشات بروید",
        state: notificationStateEnum.failed,
      });
      setIsAddingOrder((prev) => !prev);
      return;
    }

    const newOrder = await addOrder({
      productId: product._id!,
      productName: product.name,
      quantity: 1,
      userId: user._id,
      price: product.price,
    });

    setNotificationState({
      message: "به سبد افزوده شد",
      state: notificationStateEnum.success,
    });
    setIsAddingOrder((prev) => false);
  }
  return (
    <>
      <button
        onBlur={() => setIsAddingOrder(false)}
        ref={purchaseButtonRef}
        onClick={() => {
          handlePurchaseClick();
        }}
        disabled={product.quantity === 0 && isAddingOrder}
        className=" disabled:cursor-not-allowed  hover:disabled:bg-white/5 hover:bg-white/10 h-full items-center w-full flex justify-center"
      >
        <CgShoppingCart />
        {isAddingOrder && (
          <section
            className={
              " absolute w-full flex text-black bg-black/20  justify-between text-center  -top-[50px]"
            }
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleAddOrder();
              }}
              className="text-white   backdrop-blur-3xl  flex-initial rounded-r p-2 w-full h-full text-nowrap"
            >
              افزودن به سبد و ادامه خرید
            </div>
            <section className="w-[1px] h-[80%]"></section>
            <div className="text-white  backdrop-blur-3xl rounded-l p-2 w-full h-full text-nowrap">
              تسویه و تکمیل خرید
            </div>
          </section>
        )}
      </button>
    </>
  );
};

export default Purchase;
