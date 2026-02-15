import { headers, imageHeaders, API} from "./SERVICE_CONSTANTS";

export async function ApiStoreProductCategory(form){
    const response = await API.post('/product_categories/store', form, imageHeaders);
    return response.data;
};


export async function ApiGetProductCategory(){
    const response = await API.get('/product_categories', headers);
    return response.data;
};

export async function ApiUpdateProductCategory(form, productCategoryId){
    const response = await API.post(`/product_categories/update/${productCategoryId}`, form, imageHeaders);
    return response.data;
};

export async function ApiDeleteProductCategory(productCategoryId){
    const response = await API.delete(`/product_categories/delete/${productCategoryId}`, headers);
    return response.data;
};