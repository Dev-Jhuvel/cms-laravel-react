import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
    loading: false,
    message: null,
    setLoading: async (value) => set({ loading: value }),
    setMessage: async (value) => set({ message: value }),
    clearMessage: () => set({ message: null }),
}));

export default useGlobalStore;
