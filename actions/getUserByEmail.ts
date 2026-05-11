"use server";

import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserByEmail = async (email: string) => {
  await connectDB();
  const user: UserType | null = await User.findOne({ email: email });
  if (!user) {
    return undefined;
  }
  const newUser: UserType = {
    _id: JSON.parse(JSON.stringify(user._id)),
    isAdmin: user.isAdmin,
    email: user.email,
    bookmarks: user.bookmarks,
    createdAt: user.createdAt,
    orders: user.orders,
    password: user.password,
    updateAt: user.updateAt,
  };
  return newUser;
};

export default getUserByEmail;
