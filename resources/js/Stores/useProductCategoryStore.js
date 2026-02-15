import { create } from "zustand";
import useGlobalStore from "./useGlobalStore";
import {
    ApiStoreProductCategory,
    ApiGetProductCategory,
    ApiUpdateProductCategory,
    ApiDeleteProductCategory,
} from "../Services/productCategoryService";

const useProductCategoryStore = create((set, get) => ({
    productCategories: null,
    errors: null,
    links: null,
    storeProductCategory: async (form) =>{
        const setLoading = useGlobalStore.getState().setLoading;
        const setMessage = useGlobalStore.getState().setMessage;
        setLoading(true);
        try {
            await ApiStoreProductCategory(form);
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
    getProductCategory: async () =>{
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            const response = await ApiGetProductCategory();
            set({productCategories: response.data, links: response.links})
        } catch (error) {
            if (error.response) {
                setMessage({ type: "error", text: "Error in fetching category." });
                set({ errors: error.response.data.errors });
            }
        }
    },
    updateProductCategory: async (form, productCategoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiUpdateProductCategory(form, productCategoryId);
            setMessage({type: 'success', text: 'Category Updated.'});
        } catch (error) {
            if(error.response){
                setMessage({type: 'error', text: 'Error in updating Category.'});
                set({errors: error.response.data.errors});
            }
        }finally{
            setLoading(false);
        }
    },

    deleteProductCategory: async (productCategoryId) =>{
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true)
        try {
            await ApiDeleteProductCategory(productCategoryId)
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

export default useProductCategoryStore;