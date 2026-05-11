"use server";
import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserBookmarks = async (email: string): Promise<string[] | null> => {
  await connectDB();
  const user: UserType | null = await User.findOne({ email });
  if (!user || !user?.bookmarks) return null;
  return user.bookmarks;
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
