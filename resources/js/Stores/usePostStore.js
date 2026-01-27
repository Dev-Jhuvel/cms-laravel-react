import { create } from "zustand";
import { storePost as ApiStorePost, getPost as ApiGetPost, getPage as ApiGetPage } from "../Services/postService";
import useGlobalStore from "./useGlobalStore";
import useAuthStore from "./useAuthStore";

const usePostStore = create((set, get) =>({
    posts: null,
    links: null,
    errors: null,
    message: null,
    storePost: async (form) =>{
        set({errors: null});
        const setMessage = useGlobalStore.getState().setMessage;
        const setLoading = useGlobalStore.getState().setLoading;
        setLoading(true);
        try {
            await ApiStorePost(form);
            setMessage({type:'success', text:'New Post Uploaded!'});
        } catch (error) {
            setMessage({type:'error', text:'Error in Uploading Post'});
            set({errors: error.response.data.errors});
        }finally{
            setLoading(false)
        }
    },
    getPost: async (url = '') =>{
        const setMessage = useGlobalStore.getState().setMessage;
        try {
            set({post: null});
            const userId = useAuthStore.getState().user.id;
            let param  = {
                url: url,
                id: userId,
            }
            const response = await ApiGetPost(param);
            set({posts:response.data, links:response.links});
        } catch (error) {
            setMessage({type:'error', text:'Error in Fetching Post'});
            set({errors: error.response.data.errors});
        }
    },
}));

export default usePostStore;