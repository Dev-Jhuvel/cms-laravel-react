import { headers, API} from "./SERVICE_CONSTANTS";

export async function ApiStorePostCategory(form){
    const response = await API.post('/post_categories/store', form, headers);
    return response.data;
};


export async function ApiGetPostCategory(){
    const response = await API.get('/post_categories', headers);
    return response.data;
};

export async function ApiUpdatePostCategory(form, postCategoryId){
    const response = await API.post(`/post_categories/update/${postCategoryId}`, form, headers);
    return response.data;
};

export async function ApiDeletePostCategory(postCategoryId){
    const response = await API.delete(`/post_categories/delete/${postCategoryId}`, headers);
    return response.data;
};