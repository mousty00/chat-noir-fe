import { ApiResponse } from "./cat";
import { FavoritesPaginationData } from "./favorites";

export type FriendshipStatus = "PENDING" | "ACCEPTED" | "BLOCKED";

export interface UserPublic {
  id: string;
  username: string;
  image?: string;
  friendStatus?: FriendshipStatus | null;
}

export interface Friendship {
  id: string;
  friend: UserPublic;
  status: FriendshipStatus;
  iAmRequester: boolean;
  createdAt?: string;
}

export type FriendshipApiResponse = ApiResponse<Friendship>;
export type FriendshipListApiResponse = ApiResponse<Friendship[]>;
export type ExploreUsersApiResponse = ApiResponse<{
  result: UserPublic[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}>;
export type FriendFavoritesApiResponse = ApiResponse<FavoritesPaginationData>;
