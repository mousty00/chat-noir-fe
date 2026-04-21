import { useQuery } from "@apollo/client/react";
import { MY_FRIENDS } from "@/graphql/friendship";
import { Friendship, FriendshipListApiResponse } from "@/types/friendship";
import type { ErrorLike } from "@apollo/client";

interface UseFriendsReturn {
  friends: Friendship[];
  loading: boolean;
  error: ErrorLike | undefined;
  refetch: () => void;
}

export const useFriends = (): UseFriendsReturn => {
  const { data, loading, error, refetch } = useQuery<{
    myFriends: FriendshipListApiResponse;
  }>(MY_FRIENDS, { fetchPolicy: "cache-and-network" });

  return {
    friends: data?.myFriends?.data ?? [],
    loading,
    error,
    refetch,
  };
};
