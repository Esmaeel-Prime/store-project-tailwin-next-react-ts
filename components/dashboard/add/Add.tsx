"use client";
import addProduct from "@/actions/addProduct";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import React, { useContext, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";

const Add = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>();
  const { setNotificationState } = useContext(NotificationActionsContext);
  const optionInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const compNameInput = useRef<HTMLInputElement>(null);
  const madeDateInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const colorInput = useRef<HTMLInputElement>(null);
  const ImageInput = useRef<HTMLInputElement>(null);
  const quantityInput = useRef<HTMLInputElement>(null);
  const handleAddOption: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
    if (key.key === "Enter") {
      const value = optionInput.current?.value;
      if (value) {
        setOptions((prev) => {
          const doesValueExist = options.some((item) => item === value);
          return doesValueExist ? prev : [...options, value.trim()];
        });
      }
      optionInput.current!.value = "";
    }
  };

  function handleRemoveOption(content: string) {
    const newOption = options.filter((item) => item !== content.trim());
    setOptions(newOption);
  }
  async function handleSubmitButton(button: React.MouseEvent) {
    if (
      nameInput.current?.value &&
      compNameInput.current?.value &&
      madeDateInput.current?.value &&
      priceInput.current?.value &&
      descriptionInput.current?.value &&
      colorInput.current?.value &&
      ImageInput.current?.value &&
      quantityInput.current?.value
    ) {
      //TODO submit new product
      const product: productType = {
        color: colorInput.current.value,
        companyName: compNameInput.current.value,
        description: descriptionInput.current.value,
        image: ImageInput.current.value,
        madeDate: madeDateInput.current.value,
        name: nameInput.current.value,
        option: options,
        price: priceInput.current.value,
        quantity: parseFloat(quantityInput.current?.value),
      };
      if (isAddingProduct) {
        return;
      }

      setIsAddingProduct(true);
      const reader = new FileReader();
      const secondRedear = new FileReader();
      secondRedear.readAsArrayBuffer(ImageInput.current.files![0]);
      reader.readAsDataURL(ImageInput.current.files![0]);
      secondRedear.onload = (e) => {
        reader.onload = async (e) => {
          const arrayBuffer = secondRedear.result as ArrayBuffer;
          const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
            const bytes = new Uint8Array(buffer);
            let binary = "";
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
          };
          const base64Image = arrayBufferToBase64(arrayBuffer);
          const res = await addProduct(
            product,
            reader.result as string,
            base64Image,
          );
          if (!res.ok) {
            setNotificationState({
              message: res.message,
              state: notificationStateEnum.failed,
            });
            setIsAddingProduct(false);
            return;
          }
          setNotificationState({
            message: res.message,
            state: notificationStateEnum.success,
          });
          setIsAddingProduct(false);
        };
      };
    } else {
      setNotificationState({
        message: "یاید تمام گزینه ها را پر کنید",
        state: notificationStateEnum.failed,
      });
    }
  }
  function handleImageInput() {
    const isBig = ImageInput.current!.files![0].size > 10 * 1024 * 1024;
    if (isBig) {
      ImageInput.current!.files![0].slice(0, 1);
      ImageInput.current!.value = "";
      setNotificationState({
        message: "اندازه تصویر باید کوچک تر از 10mb باشد",
        state: notificationStateEnum.failed,
      });
    }
  }
  return (
    <>
      <h1 className="m-2 underline underline-offset-8">افزودن محصول جدید</h1>
      <div className="bg-white/10 mb-20 rounded w-[90%] h-1/3 md:w-[80%] md:h-1/2 md:flex mx-auto p-5 flex-wrap mt-4 justify-center items-center gap-x-20 gap-y-5 text-center md:mt-10">
        <div className="mt-2">
          <label className="block" htmlFor="name">
            نام محصول
          </label>
          <input
            ref={nameInput}
            className="block bg-white/30 rounded w-full h-10 caret-black pr-1 text-black"
            required
            name="name"
            type="text"
          />
        </div>
        <div className="mt-2">
          <label className="block" htmlFor="compName">
            شرکت سازنده
          </label>
          <input
            ref={compNameInput}
            required
            className="block bg-white/30 rounded w-full h-10 caret-black pr-1 text-black"
            name="compName"
            type="text"
          />
        </div>
        <div className="mt-2">
          <label className="block" htmlFor="madeDate">
            تاریخ ساخت
          </label>
          <input
            ref={madeDateInput}
            required
            className="block bg-white/30 rounded w-full h-10 caret-black pr-1 text-black"
            name="madeDate"
            type="datetime-local"
          />
        </div>
        <div className="mt-2">
          <label className="block" htmlFor="price">
            قیمت
          </label>
          <input
            ref={priceInput}
            required
            className="block h-10 placeholder:text-white appearance-none w-full bg-white/30 rounded caret-black pr-1 text-black"
            name="price"
            type="number"
            placeholder="فقط عدد وارد کنید"
          />
        </div>
        <div className="mt-2">
          <label className="block" htmlFor="description">
            توضیحات
          </label>
          <input
            ref={descriptionInput}
            className="block bg-white/30 h-10 w-full rounded caret-black pr-1 text-black"
            name="description"
          />
        </div>
        <div className="mt-2">
          <div onKeyDown={handleAddOption}>
            <label className="block" htmlFor="option">
              آپشن (اختیاری)
            </label>
            <input
              placeholder="برای هر آپشن یک اینتر بزنید"
              ref={optionInput}
              className="block bg-white/30 placeholder:text-sm placeholder:text-white rounded w-full h-10 caret-black pr-1 text-black"
              name="option"
              type="text"
            />
          </div>
        </div>
        <div className="flex w-full justify-center overflow-x-auto gap-x-2">
          {options.map((item) => {
            return (
              <span
                key={item + Math.random()}
                className="rounded-full bg-white/10 p-2 flex items-center gap-x-1 mt-2"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveOption(item)}
                  className="flex-1"
                >
                  <TiDelete className="w-8 h-8" />
                </button>
              </span>
            );
          })}
        </div>

        <div className="mt-2">
          <label className="block" htmlFor="color">
            رنگ
          </label>
          <input
            ref={colorInput}
            required
            className="block bg-white/30 rounded w-full h-10 caret-black pr-1 text-black"
            name="color"
            type="text"
          />
        </div>

        <div className="mt-2">
          <label className="block" htmlFor="color">
            تعداد
          </label>
          <input
            ref={quantityInput}
            required
            className="block bg-white/30 rounded placeholder:text-white w-full h-10 caret-black pr-1 "
            name="color"
            placeholder="فقط عدد وارد کنید"
            type="number"
          />
        </div>
        <div className="mt-2">
          <label className="block" htmlFor="image">
            عکس
          </label>
          <input
            ref={ImageInput}
            onChange={handleImageInput}
            required
            className="block bg-white/30 rounded w-full h-10 caret-black pr-1 text-black"
            name="image"
            type="file"
          />
        </div>
        <button
          disabled={isAddingProduct}
          onClick={handleSubmitButton}
          className="rounded hover:bg-green-500/50 bg-green-600/30 mt-8 p-2"
          type="submit"
        >
          {isAddingProduct ? "در حال بارگذاری" : "افزودن"}
        </button>
      </div>
    </>
  );
};

export default Add;
