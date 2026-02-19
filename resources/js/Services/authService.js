import { API } from "./SERVICE_CONSTANTS";
export async function ApiLogin(credentials){
    const response = await API.post("/login", credentials);
    return response.data;
}

export async function ApiRegister(form){
    const response = await API.post("/register", form)
    return response.data;
}

export async function ApiGetUser(token){
    const response = await API.get("/user",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export async function ApiLogout(token){
    await API.post("/logout", null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}