"use server";

import connectDB from "@/database/connectDB";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";

const addOrder = async (newOrder: orderType) => {
  await connectDB;
  const date = new Date();
  newOrder.createdAt = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  const user: UserType | null = await User.findById(newOrder.userId);
  if (user?.orders?.some((order) => order.productId === newOrder.productId)) {
    return undefined;
  }
  //order should set on user model
  await User.findOneAndUpdate(
    { _id: newOrder.userId },
    { $set: { orders: [...user!.orders!, newOrder] } },
  );

  //orde should sit on order model
  const newOrderDb = new Order({
    userId: newOrder.userId,
    productId: newOrder.productId,
    productName: newOrder.productName,
    quantity: newOrder.quantity,
    price: newOrder.price,
    isPaid: false,
  });
  return await newOrderDb.save();
};

export default addOrder;
