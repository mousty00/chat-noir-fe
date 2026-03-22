export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CatSubmission {
  id: string;
  userId: string;
  name: string;
  color?: string;
  category?: {
    id: string;
    name: string;
    mediaTypeHint: string;
  };
  sourceName?: string;
  notes?: string;
  status: SubmissionStatus;
  createdAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface ApiResponseSubmission {
  status: number;
  error: boolean;
  message?: string;
  success: boolean;
  data?: CatSubmission;
}

export interface PaginatedSubmission {
  result: CatSubmission[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponsePaginatedSubmission {
  status: number;
  error: boolean;
  message?: string;
  success: boolean;
  data?: PaginatedSubmission;
}
