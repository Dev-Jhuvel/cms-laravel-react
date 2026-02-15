import { create } from "zustand";
import {
    ApiStoreProduct,
    ApiGetProduct,
    ApiEditProduct,
    ApiDeleteProduct,
} from "../Services/productService";
import useGlobalStore from "./useGlobalStore";

const useProductStore = create((set, get) => ({
    products: null,
    links: null,
    errors: null,
    message: null,
    storeProduct: async (form) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiStoreProduct(form);
            setMessage({ type: "success", text: "New Product Uploaded!" });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Uploading Product" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },
    getProduct: async (url, categoryId) => {
        if (url) localStorage.setItem("currentPageUrl", url);
        const currentPageUrl = localStorage.getItem("currentPageUrl");
        if (currentPageUrl) url = currentPageUrl;
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            set({products: null});
            const response = await ApiGetProduct(url, categoryId);
            set({ products: response.data, links: response.links });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Fetching Product" });
            if (error.response) set({ errors: error.response.data.errors });
        }
    },

    editProduct: async (form, productId) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiEditProduct(form, productId);
            setMessage({ type: "success", text: "Product Edited" });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Editing Product" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },

    deleteProduct: async (productId) => {
        set({ errors: null });
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiDeleteProduct(productId);
            setMessage({ type: "success", text: "Product Deleted" });
        } catch (error) {
            setMessage({ type: "error", text: "Error in Deleting Product" });
            if (error.response) set({ errors: error.response.data.errors });
        } finally {
            setLoading(false);
        }
    },
}));

export default useProductStore;
