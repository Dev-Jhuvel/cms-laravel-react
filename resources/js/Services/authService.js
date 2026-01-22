import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export async function login(credentials){
    const response = await API.post("/login", credentials);
    return response.data;
}

export async function register(form){
    const response = await API.post("/register", form)
    return response.data;
}

export async function getUser(token){
    const response = await API.get("/user",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function logout(token){
    await API.post("/logout", null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}