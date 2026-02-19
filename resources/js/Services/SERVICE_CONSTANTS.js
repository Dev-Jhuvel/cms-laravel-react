import axios from "axios";

export const API = axios.create({
    // baseURL: "http://127.0.0.1:8000/api",
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://au-bon.onrender.com/api",
});
export const token = localStorage.getItem('token');

export const headers = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const imageHeaders = {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },
};