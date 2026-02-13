import { create } from "zustand";
import useGlobalStore from "./useGlobalStore";
import {
    ApiStorePostCategory,
    ApiGetPostCategory,
    ApiUpdatePostCategory,
    ApiDeletePostCategory,
} from "../Services/postCategoryService";

const usePostCategoryStore = create((set, get) => ({
    postCategories: null,
    errors: null,
    links: null,
    storePostCategory: async (form) =>{
        const setLoading = useGlobalStore.getState().setLoading;
        const setMessage = useGlobalStore.getState().setMessage;
        setLoading(true);
        try {
            await ApiStorePostCategory(form);
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
    getPostCategory: async () =>{
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            const response = await ApiGetPostCategory();
            set({postCategories: response.data, links: response.links})
        } catch (error) {
            if (error.response) {
                setMessage({ type: "error", text: "Error in fetching category." });
                set({ errors: error.response.data.errors });
            }
        }
    },
    updatePostCategory: async (form, postCategoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiUpdatePostCategory(form, postCategoryId);
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

    deletePostCategory: async (postCategoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true)
        try {
            await ApiDeletePostCategory(postCategoryId)
            setMessage({type: 'success', text: 'Category Deleted.'})
        } catch (error) {
            setMessage({type: 'error', text: 'Error in Deleting Category.'});
            if(error.response){
                set({errors: error.response.data.errors});
            }
        }finally{
            setLoading(false);
        }
    }
}));

export default usePostCategoryStore;