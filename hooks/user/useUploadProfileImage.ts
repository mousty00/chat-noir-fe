"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/hooks/useAuthStore";

export const useUploadProfileImage = () => {
  const [uploading, setUploading] = useState(false);
  const { updateUserImage } = useAuthStore();

  const upload = useCallback(async (file: File): Promise<boolean> => {
    const { user, token } = useAuthStore.getState();
    if (!token) return false;
    if (!user?.id) {
      toast.error("Session expired. Please log out and log in again.");
      return false;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPEG, PNG, WebP or GIF images are allowed.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10 MB.");
      return false;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append("imageFile", file);

      const res = await fetch(`${API_URL}/users/${user.id}/profile-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = "Upload failed";
        try { msg = JSON.parse(text).message ?? msg; } catch { /* non-JSON error body */ }
        throw new Error(msg);
      }

      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Upload failed");

      updateUserImage(json.data);
      toast.success("Profile image updated.");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      toast.error(msg);
      return false;
    } finally {
      setUploading(false);
    }
  }, [updateUserImage]);

  return { upload, uploading };
};
