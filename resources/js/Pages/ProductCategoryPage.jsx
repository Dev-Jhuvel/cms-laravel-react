import { useEffect, useState } from "react";
import ProductCategoryModal from "../Modals/ProductCategoryModal";
import useProductCategoryStore from "../Stores/useProductCategoryStore";
import Pagination from '../Components/Pagination';

const ProductCategoryPage = () => {
    const [method, setMethod] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const { productCategories, links, getProductCategory, deleteProductCategory} = useProductCategoryStore();
    
    useEffect(() =>{
        getProductCategory();
    }, []);
    return (
        <section className="w-full bg-base-200 h-ful">
            <div className="px-2 pt-10">
                <h1 className="text-primary text-center text-3xl font-bold">
                    Manage Post Categories
                </h1>
                <button
                    className="btn btn-primary ml-5"
                    onClick={() => {
                        document.getElementById("product_category_modal").showModal();
                        setMethod("create");
                    }}
                >
                    Create New Category
                </button>
            </div>
            <ProductCategoryModal method={method} productCategory={selectedCategory} setMethod={setMethod} />
            <div className="w-full py-5 px-10">
                {productCategories ? (
                    <div className="w-full">
                        <div className="overflow-x-auto w-[80%] h-[72vh] m-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="w-[10%] text-center">#</th>
                                        <th className="w-[60%]">Name</th>
                                        <th className="w-[10%] text-center">
                                            Count
                                        </th>
                                        <th className="w-[20%] text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productCategories.map((category, index) => {
                                        return (
                                            <tr
                                                key={category.name}
                                                className="hover:bg-base-300"
                                            >
                                                <th className="text-center">  {index + 1}
                                                </th>
                                                <td>{category.name}</td>
                                                <td className="text-center">
                                                    {category.products_count}
                                                </td>
                                                <td className="flex gap-4">
                                                    <button
                                                        className="btn btn-info"
                                                        onClick={() => {
                                                            document.getElementById("product_category_modal").showModal();
                                                            setMethod("view");
                                                            setSelectedCategory(category);
                                                        }}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => {
                                                            document.getElementById("product_category_modal").showModal();
                                                            setMethod("edit");
                                                            setSelectedCategory(category);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-error"
                                                        disabled={
                                                            category.products_count > 0
                                                        }
                                                        onClick={() => {
                                                            deleteProductCategory(category.id);
                                                            getProductCategory();
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            links={links}
                            onPageChange={() => getProductCategory()}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full p-10">
                        <div className="flex w-[90%] flex-col gap-4 m-auto">
                            <div className="skeleton h-12 w-full"></div>
                            {Array.from({ length: 8 }).map((_, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="skeleton h-10 w-full"
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductCategoryPage;
