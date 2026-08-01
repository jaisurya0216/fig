import { create } from 'zustand';

interface AppState {
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;

  viewedMemoryIds: Set<string>;
  markMemoryViewed: (id: string) => void;
  totalMemories: number;
  setTotalMemories: (n: number) => void;

  musicUnlocked: boolean;
  setMusicUnlocked: (v: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  introComplete: false,
  setIntroComplete: (v) => set({ introComplete: v }),

  viewedMemoryIds: new Set(),
  markMemoryViewed: (id) =>
    set((state) => {
      const next = new Set(state.viewedMemoryIds);
      next.add(id);
      return { viewedMemoryIds: next };
    }),
  totalMemories: 0,
  setTotalMemories: (n) => set({ totalMemories: n }),

  musicUnlocked: false,
  setMusicUnlocked: (v) => set({ musicUnlocked: v }),
}));

export const useAllMemoriesViewed = () => {
  const { viewedMemoryIds, totalMemories } = useStore();
  return totalMemories > 0 && viewedMemoryIds.size >= totalMemories;
};
