import { create } from "zustand";
import useGlobalStore from "./useGlobalStore";
import { storeCategory as ApiStoreCategory, getCategory as ApiGetCategories, updateCategory as ApiUpdateCategory, deleteCategory as ApiDeleteCategory} from "../Services/categoryService"

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
        } catch (error) {
            if (error.response) {
                setMessage({ type: "error", text: "Error in fetching category." });
                set({ errors: error.response.data.errors });
            }
        }
    },
    updateCategory: async (form, categoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiUpdateCategory(form, categoryId);
            setMessage({type: success, text: 'Category Updated.'});
        } catch (error) {
            if(error.response){
                setMessage({type: 'error', text: 'Error in updating Category.'});
                set({errors: error.response.data.errors});
            }
        }finally{
            setLoading(false);
        }
    },

    deleteCategory: async (categoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true)
        try {
            await ApiDeleteCategory(categoryId)
            setMessage({type: success, text: 'Category Deleted.'})
        } catch (error) {
            setMessage({type: error, text: 'Error in Deleting Category.'});
            if(error.response){
                set({errors: error.response.data.errors});
            }
        }finally{
            setLoading(true);
        }
    }
}));

export default useCategoryStore;