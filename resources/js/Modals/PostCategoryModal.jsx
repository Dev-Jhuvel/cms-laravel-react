import { useEffect, useState } from "react";
import usePostCategoryStore from "../Stores/usePostCategoryStore";

export default function PostCategoryModal({method, category, setMethod = () => {}}) {
    const { getPostCategory, storePostCategory, updatePostCategory, errors } = usePostCategoryStore();
    const defaultForm = { name: "" };
    const [form, setForm] = useState(defaultForm);

    const handleChanges = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value ?? "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("post_category_modal").close();
        const formData = new FormData();
        formData.append("name", form.name);
        if (method === "create") {
            storePostCategory(form);
        } else {
            updatePostCategory(form, category.id);
        }
        setForm(defaultForm);
        getPostCategory();
    };

    useEffect(() => {
        if (method === "create") {
            setForm(defaultForm);
        } else {
            setForm(category);
        }
    }, [category, method]);

    return (
        <dialog id="post_category_modal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">
                    {" "}
                    {method === "create"
                        ? " Create a new "
                        : method === "view"
                          ? "View "
                          : "Edit "}{" "}
                    Category
                </h3>
                <hr />
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                <form onSubmit={handleSubmit} className="mx-auto">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Name
                        </legend>
                        <input
                            type="text"
                            name="name"
                            disabled={method === "view"}
                            value={form.name || ""}
                            onChange={handleChanges}
                            className="input input-secondary w-full"
                            placeholder="What kind of Post is this?"
                        />
                        {errors && (
                            <p className="text-red-600">{errors.name}</p>
                        )}
                    </fieldset>
                    <hr />
                    {(method === "create" || method === "edit") && (
                        <div className="modal-action mt-3">
                            <button
                                type="submit"
                                disabled={
                                    JSON.stringify(form) ==
                                    JSON.stringify(defaultForm)
                                }
                                className="btn btn-primary"
                            >
                                {method === "create" ? "Create" : "Edit"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </dialog>
    );
}
