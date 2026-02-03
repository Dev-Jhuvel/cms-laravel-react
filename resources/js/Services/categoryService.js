import { headers, API} from "./SERVICE_CONSTANTS";

export async function storeCategory(form){
    const response = await API.post('/categories/store', form, headers);
    return response.data;
};


export async function getCategory(){
    const response = await API.get('/categories', headers);
    return response.data;
};

export async function updateCategory(form, categoryId){
    const response = await API.post(`/categories/update/${categoryId}`, form, headers);
    return response.data;
};

export async function deleteCategory(categoryId){
    const response = await API.delete(`/categories/delete/${categoryId}`, headers);
    return response.data;
};