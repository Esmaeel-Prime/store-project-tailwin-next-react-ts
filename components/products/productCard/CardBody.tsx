"use client";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

const CardBody = ({ product }: { product: productType }) => {
  const rout = useRouter();
  return (
    <div className="mb-20">
      <img
        alt={product.name}
        src={product.image}
        className="w-full rounded"
        onError={(e) => console.error("Image load error:", e)}
      />

      <button
        onClick={() => rout.push(`/products/${product._id}`)}
        className="bg-white/5 rounded-full p-2 w-fit mx-auto mt-2"
      >
        {product.name}
      </button>

      <p>{product.description}</p>
      <hr className="border-0 h-px bg-white/30 mt-10" />
      <section className="flex justify-start m-2 flex-wrap gap-x-2 gap-y-2 ">
        <section
          className={`${
            product.quantity === 0 ? "bg-red-500/20" : "bg-green-500/20"
          } rounded-full p-1 flex items-center`}
        >
          <span>موجودی</span>
          <span className="mt-1">:{product.quantity}</span>
        </section>
        <h2 className="bg-white/5  rounded-full p-2">قیمت:{product.price}</h2>

        <h2 className="bg-white/5  rounded-full p-2">رنگ:{product.color}</h2>
        <h2 className="bg-white/5  rounded-full p-2">
          شرکت:{product.companyName}
        </h2>
        <h3 className="bg-white/5  rounded-full p-2">
          سال تولید:{product.madeDate.toString()}
        </h3>
      </section>
      <hr className="border-0 h-px bg-white/30" />

      <section className=" flex mt-5 items-end gap-x-2">
        <h1 className="text-start mb-2">آپشن:</h1>
        {product.option.map((item) => {
          return (
            <Fragment key={product.name + Math.random()}>
              <span className="rounded-full bg-white/5 p-1">{item}</span>{" "}
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default CardBody;
