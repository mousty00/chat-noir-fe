import { ApiResponse, Cat } from "./cat";

export interface UserFavorite {
  id: string;
  cat: Cat;
}

export interface FavoritesPaginationData {
  result: UserFavorite[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type FavoritesApiResponse = ApiResponse<FavoritesPaginationData>;
