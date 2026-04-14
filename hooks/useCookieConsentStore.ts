import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CookieCategory = "essential" | "functional" | "analytics";

interface CookieConsent {
  essential: boolean; // always true — required for the service
  functional: boolean; // theme, preferences
  analytics: boolean; // reserved for future use
}

interface CookieConsentState {
  hasConsented: boolean;
  consentDate: string | null;
  consent: CookieConsent;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (category: CookieCategory, value: boolean) => void;
  saveConsent: (consent: CookieConsent) => void;
  resetConsent: () => void;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      consentDate: null,
      consent: {
        essential: true,
        functional: false,
        analytics: false,
      },

      acceptAll: () =>
        set({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          consent: { essential: true, functional: true, analytics: true },
        }),

      rejectAll: () =>
        set({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          consent: { essential: true, functional: false, analytics: false },
        }),

      updateConsent: (category, value) =>
        set((state) => ({
          consent: {
            ...state.consent,
            [category]: category === "essential" ? true : value,
          },
        })),

      saveConsent: (consent) =>
        set({
          hasConsented: true,
          consentDate: new Date().toISOString(),
          consent: { ...consent, essential: true },
        }),

      resetConsent: () =>
        set({
          hasConsented: false,
          consentDate: null,
          consent: { essential: true, functional: false, analytics: false },
        }),
    }),
    {
      name: "chat-noir-consent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
