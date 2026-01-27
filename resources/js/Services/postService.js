import axios from "axios";


const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

const token = localStorage.getItem('token');

export async function storePost(form){
    const response = await API.post('/post/store', form, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export async function getPost(option = {}){
    let url;
    if(option.id) url = `/post/${option.id}`;
    if(option.url) url = option.url;
    const response = await API.get(url,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export async function getPage(url){
    const response = await API.get(url ,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};