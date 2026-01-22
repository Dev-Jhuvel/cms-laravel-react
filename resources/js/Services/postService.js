import axios from "axios";


const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export async function upload(formData){
    const token = localStorage.getItem('token');
    const response = await API.post('/post/upload', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}