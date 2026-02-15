import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import ProductModal from "../Modals/ProductModal";
import useProductStore from "../Stores/useProductStore";
import useThemeStore from "../Stores/useThemeStore";
import Pagination from "../Components/Pagination";
import useProductCategoryStore from "../Stores/useProductCategoryStore";

export default function ProductPage() {
    const { products, getProduct, links } = useProductStore();
    const { logo } = useThemeStore();
    const [filterProductCategory, setFilterProductCategory] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({});
    const {productCategories, getProductCategory } = useProductCategoryStore();
    const [method, setMethod] = useState("");
    const truncate = (text = "", length = 20) => {
        if (!text) return;
        return text.length > length ? text.slice(0, length) + "...." : text;
    };

    const handleChanges = (e) => {
        setFilterProductCategory(e.target.value);
    };

    useEffect(() => {
        getProductCategory();
    }, []);

    useEffect(() => {
        getProduct(null, filterProductCategory);
    }, [filterProductCategory]);

    return (
        <>
            <div className="w-full bg-base-200 ">
                <div className="px-2 pt-10">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Products
                    </h1>
                    <div className="w-full flex gap-5 items-center">
                        <button
                            className="btn btn-primary ml-5"
                            onClick={() => {
                                document.getElementById("product_modal").showModal();
                                setMethod("create");
                            }}
                        >
                            Create New Product
                        </button>
                        <fieldset className="fieldset">
                            {/* <legend className="fieldset-legend text-lg">
                                Category
                            </legend> */}
                            <select
                                name="productCategoryId"
                                onChange={handleChanges}
                                // onChange={(e)=>debouncedFilter(e.target.value)}
                                value={filterProductCategory || ""}
                                // disabled={method === 'view'}
                                className="input input-secondary w-full"
                                placeholder="Select Category"
                            >
                                <option value="">All Categories</option>
                                {productCategories &&
                                    productCategories.map((category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </fieldset>
                    </div>
                </div>
                <ProductModal method={method} product={selectedProduct} setMethod={setMethod}/>
                <div className="w-full py-5 px-10">
                    {products ? (
                        <div className="w-full">
                            <div className="flex flex-wrap justify-center gap-2 h-[72vh]">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="card bg-base-100 w-80 h-65 shadow-sm group"
                                        onClick={() => {
                                            document.getElementById("product_modal").showModal();
                                            setMethod("view");
                                            setSelectedProduct(product);
                                        }}
                                    >
                                        <div
                                            className="m-3 h-full w-[90%] bg-cover bg-center rounded-xl shadow-2xl overflow-y-scroll group-hover:rounded-t-xl group-hover:w-full group-hover:m-0 relative"
                                            style={{
                                                backgroundImage: `url(${product.image === "" ? logo : product.image})`,
                                            }}
                                        >
                                            <div className="text-primary text-center font-bold bg-primary-content rounded-2xl px-2 py-1 right-2 top-2 absolute">
                                                {product.product_category.name}
                                            </div>
                    
                                        </div>
                                        <div className="items-center pb-5 group-hover:pb-3">
                                            <h2 className="text-center font-bold text-sm group-hover:text-base">
                                                {truncate(product.name)}
                                            </h2>
                                            <p className="text-center text-xs group-hover:hidden">
                                                {truncate(product.descriptions)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                links={links}
                                onPageChange={(url) =>
                                    getProduct(url, filterProductCategory)
                                }
                            />
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="flex flex-wrap justify-center gap-2 h-[72vh]">
                                {Array.from({ length: 8 }).map((v, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="card bg-base-100 w-80 h-60 shadow-sm group"
                                        >
                                            <div className="skeleton m-3 h-full w-[90%] bg-base-300 rounded-xl overflow-y-scroll"></div>
                                            <div className="w-full">
                                                <div className="skeleton w-[90%] bg-base-300 h-4 mx-auto"></div>
                                                <div className="skeleton w-[90%] bg-base-300 h-4 mx-auto my-3"></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
