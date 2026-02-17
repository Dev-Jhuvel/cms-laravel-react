import { create } from "zustand";
import {
    ApiHomePage,
    ApiMenu,
} from "../Services/homeService";
const useHomeStore = create((set, get) =>({
    posts: null,
    postCategories: null,
    productCategories: null,
    products: null,
    selectedCategoryId: null,
    errors: null,
    getData: async () =>{
        try {
            set({posts: null, productCategories: null});
            const response = await ApiHomePage();
            // set({posts: response.posts, productCategories: response.product_category, products: response.products});
            set({posts: response.posts, productCategories: response.product_category});
        } catch (error) {
            if (error.response) set({ errors: error.response.data.errors });
        }
    },

    getMenu: async () =>{
        try {
            set({products: null});
            console.log('asdasd');

            const response = await ApiMenu(get().selectedCategoryId);
            set({products: response.products});
        } catch (error) {
            if (error.response) set({ errors: error.response.data.errors });
        }
    },
    setProductCategory: async (ProductCategoryId) =>{
        set({selectedCategoryId: ProductCategoryId});
    }
}));

export default useHomeStore;