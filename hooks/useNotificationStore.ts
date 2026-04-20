import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/types/auth";

interface NotificationStore {
  unseenCount: number;
  user: User | null;
  setUser: (user: User | null) => void;
  increment: (by?: number) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      unseenCount: 0,
      user: null,
      setUser: (user: User | null) => set({ user }),
      increment: (by = 1) => set((s) => ({ unseenCount: s.unseenCount + by })),
      clear: () => set({ unseenCount: 0 }),
    }),
    {
      name: "cn_notifications",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        unseenCount: state.unseenCount,
      }),
    }
  )
);
