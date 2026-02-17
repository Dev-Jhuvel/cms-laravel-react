import { create } from "zustand";
import {
    ApiLogin,
    ApiLogout,
    ApiRegister,
    ApiGetUser,
} from "../Services/authService";
import useGlobalStore from "./useGlobalStore";
import { persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
const useAuthStore = create(
    persist((set) => ({
        user: null,
        token: null,
        errors: null,
        isAuthenticated: false,

        login: async (credentials) => {
            set({ errors: null });
            const setMessage = useGlobalStore.getState().setMessage;
            try {
                const { token, user } = await ApiLogin(credentials);
                set({ user, token, isAuthenticated: true, errors: null });
                localStorage.setItem("token", token);
                setMessage({ type: "success", text: "Login Successfully!" });
            } catch (error) {
                console.error("Login failed", error);
                if (error.response) {
                    setMessage({ type: "error", text: "Login Failed!" });
                    set({ errors: error.response.data.errors });
                }
            }
        },

        register: async (form) => {
            const setMessage = useGlobalStore.getState().setMessage;
            set({ errors: null });
            try {
                const { token, user } = await ApiRegister(form);
                set({ user, token, isAuthenticated: true, errors: null });
                setMessage({
                    type: "success",
                    text: "Registration Successfully!",
                });
            } catch (error) {
                console.error("Registration failed", error);
                if (error.response) {
                    setMessage({ type: "error", text: "Registration Failed!" });
                    set({ errors: error.response.data.errors });
                }
            }
        },

        getUser: async () => {
            const token = localStorage.getItem("token");
            const setLoading = useGlobalStore.getState().setLoading;
            if (!token) return;
            try {
                setLoading(true);
                const user = await ApiGetUser(token);
                set({ user, token, isAuthenticated: true });
            } catch (error) {
                localStorage.clear();
                set({ user: null, token: null, isAuthenticated: false });
            } finally {
                setLoading(false);
            }
        },

        logout: async () => {
            const setMessage = useGlobalStore.getState().setMessage;
            const token = localStorage.getItem("token");
            if (token) {
                ApiLogout(token);
                localStorage.clear();
                setMessage({ type: "success", text: "Logout Successfully!" });
                set({ user: null, token: null, isAuthenticated: false });
            }
        },

        authResetter: () => set({ errors: null }),
    }),
    {
        name: "auth-storage", 
        getStorage: () => localStorage,
    }
),
);

export default useAuthStore;
