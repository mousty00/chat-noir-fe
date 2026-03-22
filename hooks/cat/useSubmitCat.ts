import { useMutation } from "@apollo/client/react";
import { SUBMIT_CAT, MY_SUBMISSIONS } from "@/graphql/submission";
import { ApiResponseSubmission } from "@/types/submission";
import { useCallback, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { API_URL } from "@/constants/api";

interface SubmitCatInput {
  name: string;
  color?: string;
  category?: { id: string; name: string; mediaTypeHint: string };
  sourceName?: string;
  notes?: string;
  mediaFile?: File | null;
}

interface UseSubmitCatReturn {
  submitCat: (input: SubmitCatInput) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useSubmitCat = (): UseSubmitCatReturn => {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuthStore();

  const [submitMutation, { loading: mutationLoading }] = useMutation<{
    submitCat: ApiResponseSubmission;
  }>(SUBMIT_CAT, {
    refetchQueries: [{ query: MY_SUBMISSIONS, variables: { page: 0, size: 12 } }],
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
          context: {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          },
        });

        const response = data?.submitCat;
        if (!response?.success || !response.data?.id) {
          throw new Error(response?.message || "Submission failed");
        }

        if (input.mediaFile) {
          setUploading(true);
          const formData = new FormData();
          formData.append("mediaFile", input.mediaFile);

          const res = await fetch(`${API_URL}/submissions/${response.data.id}/media`, {
            method: "POST",
            headers: { Authorization: token ? `Bearer ${token}` : "" },
            body: formData,
          });

          if (!res.ok) {
            throw new Error(`Media upload failed: ${res.statusText}`);
          }
        }

        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Submission failed";
        setError(msg);
        return false;
      } finally {
        setUploading(false);
      }
    },
    [submitMutation, token]
  );

  return { submitCat, loading: mutationLoading || uploading, error };
};
