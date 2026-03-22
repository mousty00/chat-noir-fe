import { useMutation } from "@apollo/client/react";
import { SUBMIT_CAT, MY_SUBMISSIONS } from "@/graphql/submission";
import { ApiResponseSubmission } from "@/types/submission";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";

interface SubmitCatInput {
  name: string;
  color?: string;
  category?: { id: string; name: string; mediaTypeHint: string };
  sourceName?: string;
  notes?: string;
}

interface UseSubmitCatReturn {
  submitCat: (input: SubmitCatInput) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useSubmitCat = (): UseSubmitCatReturn => {
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const [submitMutation, { loading }] = useMutation<{
    submitCat: ApiResponseSubmission;
  }>(SUBMIT_CAT, {
    refetchQueries: [{ query: MY_SUBMISSIONS, variables: { page: 0, size: 12 } }],
    context: {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    },
  });

  const submitCat = useCallback(
    async (input: SubmitCatInput): Promise<boolean> => {
      setError(null);
      try {
        const { data } = await submitMutation({
          variables: {
            submission: {
              name: input.name,
              color: input.color || null,
              category: input.category
                ? { id: input.category.id, name: input.category.name, mediaTypeHint: input.category.mediaTypeHint }
                : null,
              sourceName: input.sourceName || null,
              notes: input.notes || null,
            },
          },
        });

        const response = data?.submitCat;
        if (!response?.success) {
          throw new Error(response?.message || "Submission failed");
        }
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Submission failed";
        setError(msg);
        return false;
      }
    },
    [submitMutation]
  );

  return { submitCat, loading, error };
};
