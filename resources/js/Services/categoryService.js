import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

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


export async function storeCategory(){
    const response = await API.post('/categories/store', headers);
    return response.data;
}