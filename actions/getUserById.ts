"use server";

import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserById = async (id: string) => {
  await connectDB();
  const user: UserType | null = await User.findById(id);
  if (!user) {
    return undefined;
  }
  const newUser: UserType = {
    _id: JSON.parse(JSON.stringify(user._id)),
    email: user.email,
    isAdmin: user.isAdmin,
    bookmarks: user.bookmarks,
    createdAt: user.createdAt,
    orders: user.orders,
    password: user.password,
    updateAt: user.updateAt,
  };
  return newUser;
};

export default getUserById;
