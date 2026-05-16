import { AuthUserType, getUser } from "@/actions/authenicate";
import { getUserBookmarks, HandleBookProduct } from "@/actions/bookmark";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { RootState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useSelector } from "react-redux";
type UseBookmarksType = {
  productId: string;
};

export const useBookmarks = ({ productId }: UseBookmarksType) => {
  const user = useSelector((state: RootState) => state.user);

  const { setNotificationState } = useContext(NotificationActionsContext);
  const queryClient = useQueryClient();

  const {
    data: bookmarks,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      if (!user) return null;
      try {
        return await getUserBookmarks(user.email);
      } catch (err) {
        console.error("Query error:", err);
        throw err;
      }
    },
  });

  const {
    data: isBooked,
    isError: isErrorMutate,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationFn: async () => {
      if (!user) return null;
      await HandleBookProduct(productId, user?.email);
    },
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });

  async function handleBookmarkClick() {
    const user: AuthUserType | undefined = await queryClient.getQueryData([
      "user",
    ]);

    if (!user) {
      setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.failed,
      });
      return;
    }
    await mutateAsync();
  }
  return {
    bookmarks,
    isErrorMutate,
    isErrorQuery,
    isPending,
    isLoadingQuery,
    handleBookmarkClick,
  };
};
