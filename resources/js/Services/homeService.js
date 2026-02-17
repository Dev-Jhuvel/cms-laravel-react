import { API } from "./SERVICE_CONSTANTS";

export async function ApiHomePage(){
    const response = await API.get('/');
    return response.data;
}

export async function ApiMenu(ProductCategoryId){
    const params = {product_category_id: ProductCategoryId};
    const response = await API.post('/menu', params );
    return response.data;
}

// export async function ApiMenu(){
//     const response = await API.get('/menu');
//     return response.data;
// }
