import { Cat } from "@/types/cat";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UseCatMediaDownloadReturn {
  downloadMedia: (cat: Cat) => Promise<void>;
  downloadingId: string | null;
  error: string | null;
}

export const useCatMediaDownload = (): UseCatMediaDownloadReturn => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadMedia = useCallback(
    async (cat: Cat) => {
      setDownloadingId(cat.id);
      setError(null);

      try {
        const response = await fetch(cat.image, { cache: "reload" });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const extension = cat.image.split(".").pop()?.split(/[?#]/)[0] || "jpg";
          const filename = `${cat.name}.${extension}`;

          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          return;
        }

        throw new Error("Direct fetch failed");

      } catch (err) {
        toast.error("Failed to download image");
      } finally {
        setDownloadingId(null);
      }
    },
    [],
  );

  return {
    downloadMedia,
    downloadingId,
    error,
  };
};
