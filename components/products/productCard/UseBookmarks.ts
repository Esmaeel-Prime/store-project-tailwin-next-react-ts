import { AuthUserType } from "@/actions/authenicate";
import { getUserBookmarks, HandleBookProduct } from "@/actions/bookmark";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
type UseBookmarksType = {
  productId: string;
  user: AuthUserType | undefined;
};

export const useBookmarks = ({ productId, user }: UseBookmarksType) => {
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
      const user: AuthUserType | undefined = await queryClient.getQueryData([
        "user",
      ]);

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
        state: notificationStateEnum.faild,
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
