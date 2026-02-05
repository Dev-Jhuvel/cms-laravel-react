import { headers, imageHeaders, API} from "./SERVICE_CONSTANTS";


export async function storePost(form) {
    const response = await API.post("/posts/store", form, imageHeaders);
    return response.data;
}

export async function getPost(url, category_id) {
    let final_url;
    console.log(url, category_id);
    if (url) final_url = url;
    else final_url = '/posts';
    const params = {category_id};
    const response = await API.post(final_url, params, headers);
    return response.data;
}

export async function getPage(url) {
    const response = await API.get(url, headers);
    return response.data;
}

export async function editPost(form, postId) {
    const response = await API.post(`/posts/update/${postId}`, form, imageHeaders);
    return response.data;
}

export async function deletePost(postId) {
    const response = await API.delete(`/posts/delete/${postId}`, headers);
    return response.data;
}

export async function homePage() {
    const response = await API.get('/');
    return response.data;
}
