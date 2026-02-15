import { useEffect, useState } from "react";
import PostCategoryModal from "../Modals/PostCategoryModal";
import Pagination from "../Components/Pagination";
import usePostCategoryStore from "../Stores/usePostCategoryStore";
export default function Category() {
    const [method, setMethod] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const { links, postCategories, getPostCategory, deletePostCategory } = usePostCategoryStore();

    useEffect(() => {
        getPostCategory();
    }, []);
    return (
        <>
            <div className="w-full bg-base-200 h-ful">
                <div className="px-2 pt-10">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Post Categories
                    </h1>
                    <button
                        className="btn btn-primary ml-5"
                        onClick={() => {
                            document
                                .getElementById("post_category_modal")
                                .showModal();
                            setMethod("create");
                        }}
                    >
                        Create New Category
                    </button>
                </div>
                <PostCategoryModal method={method} category={selectedCategory} setMethod={setMethod} />
                <div className="w-full py-5 px-10">
                    {postCategories ? (
                    <div className="w-full">
                        <div className="overflow-x-auto w-[80%] h-[72vh] m-auto">
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
                                    {postCategories.map((category, index) => {
                                        return (
                                            <tr key={category.name} className="hover:bg-base-300">
                                                <th className="text-center">{index + 1}</th>
                                                <td>{category.name}</td>
                                                <td className="text-center">{category.posts_count}</td>
                                                <td className="flex gap-4">
                                                    {/* <button className="btn btn-info" 
                                                        onClick={()=>{
                                                        document.getElementById("category_modal").showModal();
                                                        setMethod("view");
                                                        setSelectedCategory(category);
                                                    }}>View</button> */}
                                                    <button className="btn btn-success" 
                                                        onClick={()=>{
                                                        document.getElementById("post_category_modal").showModal();
                                                        setMethod("edit");
                                                        setSelectedCategory(category);
                                                    }}>Edit</button>
                                                    <button className="btn btn-error" 
                                                        disabled={category.posts_count > 0}
                                                        onClick={()=>{
                                                        deletePostCategory(category.id);
                                                        getPostCategory();
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                            <Pagination links={links} onPageChange={()=>getCategory()} />
                    </div>
                ) : (
                    <div className="w-full h-full p-10">
                        <div className="flex w-[90%] flex-col gap-4 m-auto">
                            <div className="skeleton h-12 w-full"></div>
                            {Array.from({length: 8}).map((_,i) =>{
                                return  <div key={i} className="skeleton h-10 w-full"></div>
                            })}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
}
