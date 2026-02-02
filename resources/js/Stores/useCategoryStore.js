import { create } from "zustand";
import useGlobalStore from "./useGlobalStore";
import { storeCategory as ApiStoreCategory, getCategory as ApiGetCategories} from "../Services/categoryService"

const useCategoryStore = create((set, get) => ({
    categories: null,
    errors: null,
    links: null,
    storeCategory: async (form) =>{
        const setLoading = useGlobalStore.getState().setLoading;
        const setMessage = useGlobalStore.getState().setMessage;
        setLoading(true);
        try {
            await ApiStoreCategory(form);
            setMessage({type: "success", text: "New category added."})
            set({errors: null});
        } catch (error) {
            if (error.response) {
                setMessage({ type: "error", text: "Error in adding category." });
                set({ errors: error.response.data.errors });
            }
        } finally{
            setLoading(false);
        }
    },
    getCategory: async () =>{
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            const response = await ApiGetCategories();
            set({categories: response.data, links: response.links})
            setMessage({type: "success", text: "Categories Loaded."})
        } catch (error) {
            if (error.response) {
                setMessage({ type: "error", text: "Error in fetching category." });
                set({ errors: error.response.data.errors });
            }
        }
    }
}));

export default useCategoryStore;