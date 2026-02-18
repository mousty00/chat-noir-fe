export interface Category {
  id: string;
  name: string;
  mediaTypeHint?: string;
}

export interface Cat {
  id: string;
  name: string;
  color: string;
  image: string;
  sourceName?: string;
  category: Category;
}

export interface PaginationData {
  result: Cat[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T> {
  status: number;
  error: boolean;
  message?: string;
  success: boolean;
  data: T;
}

export interface CatMediaDownloadInfo {
  streamUrl: string;
  filename: string;
  contentType: string;
  contentLength: number;
  extension: string;
  viewable: boolean;
}
