import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const token = localStorage.getItem('token');

const headers = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const imageHeaders = {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },
};

export async function storeCategory(form){
    const response = await API.post('/categories/store', form, headers);
    return response.data;
};


export async function getCategory(){
    const response = await API.get('/categories', headers);
    return response.data;
};