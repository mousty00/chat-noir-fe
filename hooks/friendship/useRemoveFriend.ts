import { useMutation } from "@apollo/client/react";
import { REMOVE_FRIEND, MY_FRIENDS } from "@/graphql/friendship";
import { toast } from "sonner";

export const useRemoveFriend = () => {
  const [mutate, { loading }] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [MY_FRIENDS],
    onCompleted: (data) => {
      if (data?.removeFriend?.success) {
        toast.success("Friend removed");
      } else {
        toast.error(data?.removeFriend?.message ?? "Failed to remove friend");
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const removeFriend = (friendshipId: string) =>
    mutate({ variables: { friendshipId } });

  return { removeFriend, loading };
};
