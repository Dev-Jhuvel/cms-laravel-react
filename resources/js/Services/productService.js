import { headers, imageHeaders, API} from "./SERVICE_CONSTANTS";


export async function ApiStoreProduct(form) {
    const response = await API.post("/products/store", form, imageHeaders);
    return response.data;
}

export async function ApiGetProduct(url, categoryId) {
    let final_url;
    if (url) final_url = url;
    else final_url = '/products';
    const params = {product_category_id: categoryId};
    const response = await API.post(final_url, params, headers);
    return response.data;
}

export async function ApiGetPage(url) {
    const response = await API.get(url, headers);
    return response.data;
}

export async function ApiEditProduct(form, productId) {
    const response = await API.post(`/products/update/${productId}`, form, imageHeaders);
    return response.data;
}

export async function ApiDeleteProduct(productId) {
    const response = await API.delete(`/products/delete/${productId}`, headers);
    return response.data;
}
