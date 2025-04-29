// /* eslint-disable @typescript-eslint/no-explicit-any */

import { TPropertyDetailsStoreSchema } from "@/schema/listing.schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TPropertyDetailsState = Partial<TPropertyDetailsStoreSchema> & {
  setData: (data: Partial<TPropertyDetailsStoreSchema>) => void;
  hasHydrated: boolean; // Track hydration state
  setHasHydrated: (state: boolean) => void;
};

export const usePropertyDetailsStore = create<TPropertyDetailsState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      hasHydrated: false, // Default to false
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "property-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true); // Mark as hydrated once rehydration is complete
        }
      },
    }
  )
);
