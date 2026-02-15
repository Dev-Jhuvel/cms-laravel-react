import { headers, imageHeaders, API} from "./SERVICE_CONSTANTS";


export async function ApiStorePost(form) {
    const response = await API.post("/posts/store", form, imageHeaders);
    return response.data;
}

export async function ApiGetPost(url, categoryId) {
    let final_url;
    if (url) final_url = url;
    else final_url = '/posts';
    const params = {post_category_id: categoryId};
    const response = await API.post(final_url, params, headers);
    return response.data;
}

export async function ApiGetPage(url) {
    const response = await API.get(url, headers);
    return response.data;
}

export async function ApiEditPost(form, postId) {
    const response = await API.post(`/posts/update/${postId}`, form, imageHeaders);
    return response.data;
}

export async function ApiDeletePost(postId) {
    const response = await API.delete(`/posts/delete/${postId}`, headers);
    return response.data;
}

