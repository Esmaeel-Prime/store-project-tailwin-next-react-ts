"use client";
import React, { useRef, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import editOrder from "@/actions/editeOrder";
import { getUser } from "@/actions/authenicate";
import { useRouter } from "next/navigation";
import { TiDelete } from "react-icons/ti";
import deleteOrder from "@/actions/deleteOrder";

const CardOrder = ({ order }: { order: orderType }) => {
  const [orderQuantity, setOrderQuantity] = useState<number>(order.quantity);
  const [isEditingOrder, setIsEditingOrder] = useState<boolean>(false);
  const inputQuantityRef = useRef<HTMLInputElement>(null);
  const rout = useRouter();
  async function handleOrderEdit(count: number) {
    if (isEditingOrder) return;
    setIsEditingOrder(true);
    const user = await getUser();
    if (!user) {
      return;
    }
    await editOrder(user?.email, order!.productId!, orderQuantity + count);
    setOrderQuantity((prev) => prev + count);
    rout.refresh();
    setIsEditingOrder(false);
  }

  return (
    <section className="relative bg-white/5 rounded w-80 text-nowrap p-2">
      <button
        onClick={async () => {
          await deleteOrder(order.userId, order.productId);
          rout.refresh();
        }}
        className=" absolute top-0 left-0 m-2"
      >
        <TiDelete />
      </button>
      <h1 className="mb-2">{order.productName}</h1>
      <section className="relative flex justify-center">
        <input
          ref={inputQuantityRef}
          value={orderQuantity}
          disabled
          className=" animate-count  bg-white/5 rounded w-5 h-5 text-center"
        />
        <button
          disabled={isEditingOrder}
          onClick={() => {
            if (orderQuantity > 1) {
              handleOrderEdit(-1);
            }
          }}
          className=" absolute top-0 left-0 mx-5 w-5 h-5 rounded bg-white/10"
        >
          <BiMinus />
        </button>
        <button
          disabled={isEditingOrder}
          onClick={() => handleOrderEdit(1)}
          className=" absolute top-0 right-0 mx-5 w-5 h-5 rounded bg-white/10"
        >
          <BiPlus />
        </button>
      </section>
      <hr className="w-[80%] mx-auto my-5" />
      <section className="flex justify-evenly  items-center">
        <p> پرداختی</p>:
        <p> {orderQuantity * parseFloat(order?.price || "0")}$</p>
      </section>
    </section>
  );
};

export default CardOrder;
