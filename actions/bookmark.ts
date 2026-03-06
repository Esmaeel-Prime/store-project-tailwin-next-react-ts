"use server";
import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserBookmarks = async (email: string): Promise<string[]> => {
  const user = await User.findOne({ email });
  return user?.bookmarks || [];
};

const unBookProduct = async (productId: string, email: string) => {
  await connectDB();

  try {
    const user = await User.findOne({ email: email });
    const newBookmarks: string[] = user.bookmarks.filter(
      (item: string) => item !== productId,
    );
    await User.findOneAndUpdate(
      { email: email },
      { $set: { bookmarks: newBookmarks } },
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type HandleBookProductResult = {
  isBooked: boolean;
};
const HandleBookProduct = async (
  productId: string,
  email: string,
): Promise<HandleBookProductResult> => {
  await connectDB();
  try {
    const user = await User.findOne({ email: email });
    if (user.bookmarks.some((item: string) => item === productId)) {
      const newBookmarks: string[] = user.bookmarks.filter(
        (item: string) => item !== productId,
      );
      await User.findOneAndUpdate(
        { email: email },
        { $set: { bookmarks: newBookmarks } },
      );
      return { isBooked: false };
    }
    const newBookmarks: string[] = [...user.bookmarks, productId];
    await User.findOneAndUpdate(
      { email: email },
      { $set: { bookmarks: newBookmarks } },
    );
    return { isBooked: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUserBookmarks, HandleBookProduct };
