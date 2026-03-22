import { useMutation } from "@apollo/client/react";
import { APPROVE_SUBMISSION, REJECT_SUBMISSION, PENDING_SUBMISSIONS } from "@/graphql/submission";
import { ApiResponseSubmission } from "@/types/submission";
import { useState } from "react";
import { useAuthStore } from "../useAuthStore";

interface UseReviewSubmissionReturn {
  approve: (id: string) => Promise<boolean>;
  reject: (id: string, reason?: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useReviewSubmission = (): UseReviewSubmissionReturn => {
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const context = { headers: { Authorization: token ? `Bearer ${token}` : "" } };
  const refetchQueries = [{ query: PENDING_SUBMISSIONS, variables: { page: 0, size: 20 } }];

  const [approveMutation, { loading: approveLoading }] = useMutation<{
    approveSubmission: ApiResponseSubmission;
  }>(APPROVE_SUBMISSION, { refetchQueries, context });

  const [rejectMutation, { loading: rejectLoading }] = useMutation<{
    rejectSubmission: ApiResponseSubmission;
  }>(REJECT_SUBMISSION, { refetchQueries, context });

  const approve = async (id: string): Promise<boolean> => {
    setError(null);
    try {
      const { data } = await approveMutation({ variables: { id } });
      if (!data?.approveSubmission?.success) {
        throw new Error(data?.approveSubmission?.message || "Approval failed");
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Approval failed");
      return false;
    }
  };

  const reject = async (id: string, reason?: string): Promise<boolean> => {
    setError(null);
    try {
      const { data } = await rejectMutation({ variables: { id, reason: reason || null } });
      if (!data?.rejectSubmission?.success) {
        throw new Error(data?.rejectSubmission?.message || "Rejection failed");
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rejection failed");
      return false;
    }
  };

  return { approve, reject, loading: approveLoading || rejectLoading, error };
};
