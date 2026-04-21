import { useMutation } from "@apollo/client/react";
import { RESPOND_FRIEND_REQUEST, MY_FRIENDS, PENDING_REQUESTS } from "@/graphql/friendship";
import { FriendshipApiResponse } from "@/types/friendship";
import { toast } from "sonner";

interface RespondFriendRequestData {
  respondFriendRequest: FriendshipApiResponse;
}

export const useRespondFriendRequest = () => {
  const [mutate, { loading }] = useMutation<RespondFriendRequestData>(RESPOND_FRIEND_REQUEST, {
    refetchQueries: [MY_FRIENDS, PENDING_REQUESTS],
    onCompleted: (data) => {
      if (data?.respondFriendRequest?.success) {
        const accepted = data.respondFriendRequest.data?.status === "ACCEPTED";
        toast.success(accepted ? "Friend request accepted" : "Friend request declined");
      } else {
        toast.error(data?.respondFriendRequest?.message ?? "Failed to respond");
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const respond = (friendshipId: string, accept: boolean) =>
    mutate({ variables: { friendshipId, accept } });

  return { respond, loading };
};
