import { useEffect, useState } from "react";
import CategoryModal from "../Modals/CategoryModal";
import Pagination from "../Components/Pagination";
import useCategoryStore from "../Stores/useCategoryStore";
export default function Category() {
    const [method, setMethod] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const { links, categories, getCategory, deleteCategory } = useCategoryStore();

    useEffect(() => {
        getCategory();
    }, []);
    return (
        <>
            <div className="w-full bg-base-200 h-full border-red-500">
                <div className="px-2 pt-10">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Categories
                    </h1>
                    <button
                        className="btn btn-primary ml-5"
                        onClick={() => {
                            document
                                .getElementById("category_modal")
                                .showModal();
                            setMethod("create");
                        }}
                    >
                        Create New Category
                    </button>
                </div>
                <CategoryModal method={method} category={selectedCategory} />
                {categories ? (
                    <div className="w-full h-full">
                        <div className="overflow-x-auto w-[80%] m-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="w-[10%] text-center">#</th>
                                        <th className="w-[60%]">Name</th>
                                        <th className="w-[10%] text-center">Count</th>
                                        <th className="w-[20%] text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => {
                                        return (
                                            <tr key={category.id} className="hover:bg-base-300">
                                                <th className="text-center">{index + 1}</th>
                                                <td>{category.name}</td>
                                                <td className="text-center">0</td>
                                                <td className="flex gap-4">
                                                    {/* <button className="btn btn-info" 
                                                        onClick={()=>{
                                                        document.getElementById("category_modal").showModal();
                                                        setMethod("view");
                                                        setSelectedCategory(category);
                                                    }}>View</button> */}
                                                    <button className="btn btn-success" 
                                                        onClick={()=>{
                                                        document.getElementById("category_modal").showModal();
                                                        setMethod("edit");
                                                        setSelectedCategory(category);
                                                    }}>Edit</button>
                                                    <button className="btn btn-error" 
                                                        onClick={()=>{
                                                        deleteCategory(category.id);
                                                        getCategory();
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                            <Pagination links={links} onPageChange={getCategory} />
                    </div>
                ) : (
                    <div className="w-full h-full p-10">
                        <div className="flex w-[90%] flex-col gap-4 m-auto">
                            <div className="skeleton h-12 w-full"></div>
                            {Array.from({length: 8}).map((_,v) =>{
                                return  <div className="skeleton h-10 w-full"></div>
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
