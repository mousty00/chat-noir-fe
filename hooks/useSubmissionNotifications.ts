"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { CatSubmission } from "@/types/submission";
import { useNotificationStore } from "@/hooks/useNotificationStore";

const STORAGE_KEY = "cn_sub_statuses";

type StoredStatuses = Record<string, { status: string; name: string }>;

export const useSubmissionNotifications = (submissions: CatSubmission[]) => {
  const { increment } = useNotificationStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (submissions.length === 0) return;

    let stored: StoredStatuses = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw);
    } catch {
      stored = {};
    }

    if (!initialized.current && Object.keys(stored).length === 0) {
      initialized.current = true;
      const initial: StoredStatuses = {};
      for (const s of submissions) {
        initial[s.id] = { status: s.status, name: s.name };
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return;
    }

    initialized.current = true;

    let newCount = 0;
    const updated = { ...stored };

    for (const sub of submissions) {
      const prev = stored[sub.id];
      const prevStatus = prev?.status;

      if (prevStatus === "PENDING" && sub.status === "APPROVED") {
        toast.success(`"${sub.name}" was approved and added to the archive!`);
        newCount++;
      } else if (prevStatus === "PENDING" && sub.status === "REJECTED") {
        const reason = (sub as CatSubmission).rejectionReason;
        toast.error(
          `"${sub.name}" was rejected.${reason ? ` Reason: ${reason}` : ""}`,
          { duration: 6000 }
        );
        newCount++;
      }

      updated[sub.id] = { status: sub.status, name: sub.name };
    }

    if (newCount > 0) increment(newCount);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [submissions, increment]);
};
