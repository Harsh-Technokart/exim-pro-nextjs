import { UserState } from "@/interface/sessionStore.interface";
import { create } from "zustand";

// Create the Zustand store
const useSessionStore = create<UserState>((set, get) => ({
  user: null, // Initial state
  setSession: (user) => set({ user }), // Set the user state
  removeSession: () => set({ user: null }), // Clear the user state
  getUser: () => get().user, // Return the current user state
}));

export default useSessionStore;
