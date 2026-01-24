import { create } from "zustand";
import { storePost as ApiStorePost, getPost as ApiGetPost } from "../Services/postService";
import useGlobalStore from "./useGlobalStore";
import useAuthStore from "./useAuthStore";

const usePostStore = create((set, get) =>({
    posts: null,
    errors: null,
    message: null,
    storePost: async (form) =>{
        set({errors: null});
        try {
            const setMessage = useGlobalStore.getState().setMessage;
            const token = localStorage.getItem('token');
            await ApiStorePost(form, token);
            setMessage({type:'success', text:'New Post Uploaded!'});
        } catch (error) {
            setMessage({type:'error', text:'Error in Uploading Post'});
            set({errors: error.response.data.errors});
        }
    },
    getPost: async () =>{
        try {
            set({post: null});
            const token = localStorage.getItem('token');
            const userId = useAuthStore.getState().user.id;
            const posts = await ApiGetPost(token, userId);
            set({posts});
        } catch (error) {
            setMessage({type:'error', text:'Error in Fetching Post'});
            set({errors: error.response.data.errors});
        }
    }
}));

export default usePostStore;