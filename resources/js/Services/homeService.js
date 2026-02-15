import { API } from "./SERVICE_CONSTANTS";

export async function ApiHomePage(){
    const response = await API.get('/');
    return response.data;
}

// export async function ApiMenu(){
//     const response = await API.get('/menu');
//     return response.data;
// }
