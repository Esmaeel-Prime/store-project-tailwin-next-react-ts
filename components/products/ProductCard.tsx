"use client";
import { FaShareNodes } from "react-icons/fa6";
import Bookmark from "./productCard/Bookmark";
import Purchase from "./productCard/Purchase";
import CardBody from "./productCard/CardBody";
import { useContext } from "react";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "../notification-context/NotificationProvider";

const ProductCard = ({ product }: { product: productType }) => {
  const { setNotificationState } = useContext(NotificationActionsContext);

  async function handleShareClick() {
    await navigator.clipboard
      .writeText(`${window.location.origin}/products/${product._id}`)
      .then(() => {
        setNotificationState({
          message: "آدرس در کلیپ بورد ذخیره شد",
          state: notificationStateEnum.success,
        });
      });
  }
  return (
    <div
      key={product._id! + Math.random()}
      className="w-[400px] bg-black/20  backdrop-blur-3xl rounded text-center p-4"
    >
      <CardBody product={product} />
      <section className="relative flex bg-black/20 backdrop-blur-sm rounded h-10 justify-evenly items-center">
        <button
          onClick={handleShareClick}
          className="  hover:bg-white/10 h-full rounded-r items-center w-full flex justify-center"
        >
          <FaShareNodes />
        </button>
        <div className="mx-2 w-[1px] h-4 bg-white/30"></div>
        <Purchase product={product} />
        <div className="mx-2 w-[1px] h-4 bg-white/30"></div>
        <Bookmark productId={product._id!} />
      </section>
    </div>
  );
};

export default ProductCard;
