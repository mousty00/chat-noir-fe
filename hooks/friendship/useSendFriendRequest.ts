import { useMutation } from "@apollo/client/react";
import { SEND_FRIEND_REQUEST, MY_FRIENDS, EXPLORE_USERS } from "@/graphql/friendship";
import { toast } from "sonner";

export const useSendFriendRequest = () => {
  const [mutate, { loading }] = useMutation(SEND_FRIEND_REQUEST, {
    refetchQueries: [MY_FRIENDS, EXPLORE_USERS],
    onCompleted: (data) => {
      if (data?.sendFriendRequest?.success) {
        toast.success("Friend request sent");
      } else {
        toast.error(data?.sendFriendRequest?.message ?? "Failed to send request");
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const sendRequest = (addresseeId: string) =>
    mutate({ variables: { addresseeId } });

  return { sendRequest, loading };
};
