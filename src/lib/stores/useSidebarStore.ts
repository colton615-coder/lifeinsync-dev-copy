import { create } from 'zustand';

/**
 * Sidebar State Management Store (Zustand)
 * 
 * This store manages the global sidebar open/closed state.
 * It provides:
 * - isOpen: boolean - Current sidebar state
 * - toggle: () => void - Action to toggle sidebar open/closed
 * 
 * Usage:
 * const { isOpen, toggle } = useSidebarStore();
 * 
 * This is the single source of truth for sidebar state across the app.
 * Any component can access or modify the sidebar state without prop drilling.
 */

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  
  toggle: () => set((state) => ({
    isOpen: !state.isOpen,
  })),
  
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
