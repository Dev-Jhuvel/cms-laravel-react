import { useState } from "react";
import CategoryModal from '../Modals/CategoryModal'
export default function Category() {
    const [method, setMethod] = useState("");
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
                <CategoryModal method={method} />
                <div className="w-full h-full">
                    <div className="overflow-x-auto w-[80%] m-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-base-300">
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
