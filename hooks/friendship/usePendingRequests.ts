import { useQuery } from "@apollo/client/react";
import { PENDING_REQUESTS } from "@/graphql/friendship";
import { Friendship, FriendshipListApiResponse } from "@/types/friendship";
import type { ErrorLike } from "@apollo/client";

interface UsePendingRequestsReturn {
  requests: Friendship[];
  loading: boolean;
  error: ErrorLike | undefined;
  refetch: () => void;
}

export const usePendingRequests = (): UsePendingRequestsReturn => {
  const { data, loading, error, refetch } = useQuery<{
    pendingRequests: FriendshipListApiResponse;
  }>(PENDING_REQUESTS, { fetchPolicy: "cache-and-network" });

  return {
    requests: data?.pendingRequests?.data ?? [],
    loading,
    error,
    refetch,
  };
};
