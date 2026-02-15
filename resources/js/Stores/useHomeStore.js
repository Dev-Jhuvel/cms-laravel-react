import { create } from "zustand";
import {
    ApiHomePage,
} from "../Services/homeService";
const useHomeStore = create((set) =>({
    posts: null,
    postCategories: null,
    productCategories: null,
    products: null,
    errors: null,
    getData: async () =>{
        try {
            set({posts: null, productCategories: null});
            const response = await ApiHomePage();
            set({posts: response.posts, productCategories: response.product_category, products: response.products});
        } catch (error) {
            if (error.response) set({ errors: error.response.data.errors });
        }
    } 
}));

export default useHomeStore;