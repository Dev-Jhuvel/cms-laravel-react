import { headers, API, token} from "./SERVICE_CONSTANTS";


export async function storePost(form) {
    const response = await API.post("/posts/store", form, imageHeaders);
    return response.data;
}

export async function getPost(option = {}) {
    let url;
    if (option.id) url = `/posts/${option.id}`;
    if (option.url) url = option.url;
    const response = await API.get(url, headers);
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
