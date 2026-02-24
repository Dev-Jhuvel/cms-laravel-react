import { useEffect, useRef, useState } from "react";
import usePostStore from "../Stores/usePostStore";
import useGlobalStore from "../Stores/useGlobalStore";
import usePostCategoryStore from "../Stores/usePostCategoryStore";
import { Trash } from "lucide-react";

export default function PostModal({ method, post = null, setMethod = () => {} }) {
    const defaultForm = {
        title: "",
        descriptions: "",
        postCategoryId: "",
    };

    const [file, setFile] = useState("");
    const [form, setForm] = useState(defaultForm);
    const [imagePreview, setImagePreview] = useState("");
    const { storePost, getPost, editPost, deletePost } = usePostStore();
    const { getPostCategory, postCategories } = usePostCategoryStore();
    const { setMessage } = useGlobalStore();
    const fileInputRef = useRef("");
    const modalLabel = method === "create" ? " Create a new " : method === "view" ? "View " : "Edit ";

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.startsWith("image/")) {
            return setMessage({
                type: "error",
                text: "Please select an image file",
            });
        }
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleChanges = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value ?? "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.postCategoryId === ''){
           return setMessage({type: 'error', text: 'Select Post Category!'});
        }

        document.getElementById("post_modal").close();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("descriptions", form.descriptions);
        formData.append("post_category_id", form.postCategoryId);
        if (file) formData.append("image", file);
        if (method === "create") {
            await storePost(formData);
        } else {
            await editPost(formData, post.id);
        }
        removeImage();
        setForm(defaultForm);
    };

    const removeImage = () => {
        setImagePreview("");
        setFile("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const closeModal = () => {
        document.getElementById("post_modal").close();
        setForm(defaultForm);
        removeImage();
    };

    const handleDelete = (id) =>{
        document.getElementById("post_modal").close();
        deletePost(id);
    }

    useEffect(() => {
        if (method == "create") {
            setForm(defaultForm);
            setFile("");
            setImagePreview("");
        } else {
            if(post){
                setForm({
                    title: post.title ?? "",
                    descriptions: post.descriptions ?? "",
                    postCategoryId: post.post_category_id ?? "",
                });
                setImagePreview(post.image ?? "");
            }
        }
    }, [post, method]);

    useEffect(() => {
        getPostCategory();
    }, []);

    return (
        <dialog id="post_modal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{modalLabel} Post</h3>
                <hr />
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => closeModal()}
                >
                    ✕
                </button>
                {imagePreview && (
                    <figure className="flex justify-center items-center relative mt-2">
                        <img
                            className="rounded-2xl shadow-2xl"
                            src={imagePreview}
                            alt=""
                        />
                        {(method === "create" || method === "edit") && (
                            <button
                                className="btn btn-error btn-sm py-5 absolute bottom-2 right-2"
                                onClick={() => removeImage()}
                            >
                                <Trash />
                            </button>
                        )}
                    </figure>
                    // <div className="w-full h-[50vh] bg-cover bg-center" style={{backgroundImage: `url(${post.image})`}}/>
                )}
                <form onSubmit={handleSubmit} className="mx-auto">
                    {(method === "create" || method === "edit") && (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Pick a Image
                            </legend>
                            <input
                                type="file"
                                name="image"
                                disabled={method === "view"}
                                className="file-input"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <label className="label">Max size 2MB</label>
                        </fieldset>
                    )}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Title
                        </legend>
                        <input
                            type="text"
                            name="title"
                            disabled={method === "view"}
                            value={form.title}
                            onChange={handleChanges}
                            className="input input-secondary w-full"
                            placeholder="Enjoy our all time favorite breads!"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Description
                        </legend>
                        <textarea
                            type="text"
                            name="descriptions"
                            disabled={method === "view"}
                            value={form.descriptions}
                            onChange={handleChanges}
                            className="textarea textarea-secondary w-full"
                            placeholder="Describe your post...."
                        ></textarea>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Category
                        </legend>
                        <select
                            name="postCategoryId"
                            onChange={handleChanges}
                            value={form.postCategoryId || ""}
                            disabled={method === "view"}
                            className="input input-secondary w-full"
                            placeholder="Select Category"
                        >
                            <option value="" disabled> --Select Category--</option>
                            {postCategories &&
                                postCategories.map((category) => {
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
                        {/* <input
                            type="text"
                            name="title"
                            disabled={method === 'view'}
                            value={form.title}
                            onChange={handleChanges}
                            className="input input-secondary w-full"
                            placeholder="Enjoy our all time favorite breads!"
                        /> */}
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
                {method === "view" && (
                    <div className="modal-action mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => setMethod("edit")}
                        >
                            Edit Post
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
