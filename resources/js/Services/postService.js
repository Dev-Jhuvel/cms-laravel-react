import { headers, imageHeaders, API} from "./SERVICE_CONSTANTS";


export async function storePost(form) {
    console.log(form);
    const response = await API.post("/posts/store", form, imageHeaders);
    return response.data;
}

export async function getPost(url = "") {
    let final_url;
    if (url) final_url = url;
    else final_url = '/posts';
    const response = await API.get(final_url, headers);
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
