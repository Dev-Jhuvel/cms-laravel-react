import { create } from "zustand";
import {
    storePost as ApiStorePost,
    getPost as ApiGetPost,
    getPage as ApiGetPage,
    editPost as ApiEditPost,
    deletePost as ApiDeletePost,
} from "../Services/postService";
import useGlobalStore from "./useGlobalStore";
import useAuthStore from "./useAuthStore";

const usePostStore = create((set, get) => ({
    posts: null,
    links: null,
    errors: null,
    message: null,
    storePost: async (form) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiStorePost(form);
            setMessage({ type: "success", text: "New Post Uploaded!" });
        } catch (error) {
            console.log(error);
            setMessage({ type: "error", text: "Error in Uploading Post" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },
    getPost: async (url = "") => {
        if (url) localStorage.setItem("currentPageUrl", url);
        const currentPageUrl = localStorage.getItem("currentPageUrl");
        if (currentPageUrl) url = currentPageUrl;
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            set({posts: null});
            const userId = useAuthStore.getState().user.id;
            let param = {
                url: url,
                id: userId,
            };
            const response = await ApiGetPost(param);
            set({ posts: response.data, links: response.links });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Fetching Post" });
            if (error.response) set({ errors: error.response.data.errors });
        }
    },

    editPost: async (form, postId) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiEditPost(form, postId);
            setMessage({ type: "success", text: "Post Edited" });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Editing Post" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },

    deletePost: async (postId) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiDeletePost(postId);
            setMessage({ type: "success", text: "Post Deleted" });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Deleting Post" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },
}));

export default usePostStore;
