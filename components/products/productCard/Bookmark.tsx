"use client";
import { BiBookmark, BiBookmarkPlus } from "react-icons/bi";
import { useBookmarks } from "./UseBookmarks";
import React from "react";

const Bookmark = ({ productId }: { productId: string }) => {
  const { bookmarks, isPending, isLoadingQuery, handleBookmarkClick } =
    useBookmarks({ productId });

  console.log(bookmarks);
  return (
    <button
      onClick={handleBookmarkClick}
      className="hover:bg-white/10 h-full rounded-l items-center w-full flex justify-center disabled:cursor-not-allowed"
      disabled={isPending || isLoadingQuery}
    >
      {bookmarks?.some((id) => productId === id) ? (
        <BiBookmarkPlus />
      ) : (
        <BiBookmark />
      )}
    </button>
  );
};

export default React.memo(Bookmark);
