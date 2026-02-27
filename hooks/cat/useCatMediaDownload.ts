import { useLazyQuery } from "@apollo/client/react";
import { GET_CAT_MEDIA_DOWNLOAD_INFO } from "@/graphql/cat";
import { ApiResponse, CatMediaStreamInfo } from "@/types/cat";
import { useCallback, useState } from "react";

interface UseCatMediaDownloadReturn {
  downloadMedia: (id: string, filename?: string) => Promise<void>;
  downloadingId: string | null;
  error: string | null;
}

export const useCatMediaDownload = (): UseCatMediaDownloadReturn => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [fetchDownloadInfo] = useLazyQuery<{
    catMediaDownloadInfo: ApiResponse<CatMediaStreamInfo>;
  }>(GET_CAT_MEDIA_DOWNLOAD_INFO, {
    fetchPolicy: "network-only",
  });

  const downloadFromUrl = useCallback((url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }, []);

  const downloadMedia = useCallback(
    async (id: string, customFilename?: string) => {
      setDownloadingId(id);
      setError(null);

      try {
        const { data } = await fetchDownloadInfo({ variables: { id } });
        const response = data?.catMediaDownloadInfo;

        if (!response?.success) {
          throw new Error(response?.message || "Failed to get download info");
        }

        const info = response.data;
        const filename = customFilename || info.filename;

        downloadFromUrl(info.streamUrl, filename);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Download failed";
        setError(errorMessage);
        console.error("Download error:", err);
      } finally {
        setDownloadingId(null);
      }
    },
    [fetchDownloadInfo, downloadFromUrl],
  );

  return {
    downloadMedia,
    downloadingId,
    error,
  };
};
