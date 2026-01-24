import axios from "axios";


const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export async function storePost(form, token){
    const response = await API.post('/post/store', form, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export async function getPost(token, id){
    const response = await API.get(`/post/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};