"use client";
import addOrder from "@/actions/addOrder";
import { getUser } from "@/actions/authenicate";
import getUserByEmail from "@/actions/getUserByEmail";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import React, { useContext, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

const Purchase = ({ product }: { product: productType }) => {
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const purchaseButtonRef = useRef<HTMLButtonElement>(null);
  const { setNotificationState } = useContext(NotificationActionsContext);
  function handlePurchaseClick() {
    setIsPurchasing((prev) => !prev);
  }
  async function handleAddOrder() {
    setNotificationState({
      message: "در حال بررسی",
      state: notificationStateEnum.pending,
    });
    const res = await getUser();
    if (!res) {
      setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.faild,
      });
      return;
    }
    const user = await getUserByEmail(res?.email);
    const isAdd = await addOrder({
      productId: product._id!,
      productName: product.name,
      quantity: 1,
      userId: user!._id,
      price: product.price,
    });
    if (!isAdd) {
      setNotificationState({
        message: "قبلا این کالا را انتخاب کرده‌اید به سبد سفارشات بروید",
        state: notificationStateEnum.faild,
      });
      setIsPurchasing((prev) => !prev);
      return;
    }
    setNotificationState({
      message: "به سبد افزوده شد",
      state: notificationStateEnum.success,
    });
    setIsPurchasing((prev) => !prev);
  }
  return (
    <>
      <button
        ref={purchaseButtonRef}
        // onBlur={() => setIsPurchasing(false)}
        onClick={handlePurchaseClick}
        disabled={product.quantity === 0}
        className=" disabled:cursor-not-allowed onblur hover:disabled:bg-white/5 hover:bg-white/10 h-full items-center w-full flex justify-center"
      >
        <CgShoppingCart />
      </button>

      <div
        className={`${
          isPurchasing ? undefined : "hidden"
        }  absolute flex rounded-full text-black justify-between text-center w-[350px] h-[50px] z-20 -top-[60px] right-[2.5%]`}
      >
        <button
          onClick={handleAddOrder}
          className="bg-black/90 hover:bg-black   text-white   rounded-r-full p-2 w-full h-full text-nowrap"
        >
          افزودن به سبد و ادامه خرید
        </button>
        <section className="w-[1px] h-[80%]"></section>
        <button className="bg-black/90 hover:bg-black text-white  rounded-l-full w-full h-full text-nowrap">
          تسویه و تکمیل خرید
        </button>
      </div>
    </>
  );
};

export default Purchase;
