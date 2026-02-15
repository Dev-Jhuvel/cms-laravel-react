import { useEffect, useRef, useState } from "react";
import useProductStore from "../Stores/useProductStore";
import useGlobalStore from "../Stores/useGlobalStore";
import useProductCategoryStore from "../Stores/useProductCategoryStore";
import { Trash } from "lucide-react";

export default function ProductModal({ method, product = null, setMethod = () => {} }) {
    const defaultForm = {
        name: "",
        descriptions: "",
        productCategoryId: "",
    };

    const [file, setFile] = useState("");
    const [form, setForm] = useState(defaultForm);
    const [imagePreview, setImagePreview] = useState("");
    const { storeProduct, getProduct, editProduct, deleteProduct } = useProductStore();
    const { getProductCategory, productCategories } = useProductCategoryStore();
    const { setMessage } = useGlobalStore();
    const fileInputRef = useRef("");

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
        if(form.productCategoryId === ''){
            return setMessage({type: 'error', text: 'Select Product Category!'});
        }

        document.getElementById("product_modal").close();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("descriptions", form.descriptions);
        formData.append("product_category_id", form.productCategoryId);
        if (file) formData.append("image", file);

        if (method === "create") {
            await storeProduct(formData);
        } else {
            await editProduct(formData, product.id);
        }
        getProduct();
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
        document.getElementById("product_modal").close();
        setForm(defaultForm);
        removeImage();
    };

    useEffect(() => {
        if (method == "create") {
            setForm(defaultForm);
            setFile("");
            setImagePreview("");
        } else {
            if(product){
                setForm({
                    name: product.name ?? "",
                    descriptions: product.descriptions ?? "",
                    productCategoryId: product.product_category_id ?? "",
                });
                setImagePreview(product.image ?? "");
            }
        }
    }, [product, method]);

    useEffect(() => {
        getProductCategory();
    }, []);

    return (
        <dialog id="product_modal" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">
                    {" "}
                    {method === "create"
                        ? " Create a new "
                        : method === "view"
                          ? "View "
                          : "Edit "}{" "}
                    Product
                </h3>
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
                                {" "}
                                <Trash />{" "}
                            </button>
                        )}
                    </figure>
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
                            Name
                        </legend>
                        <input
                            type="text"
                            name="name"
                            disabled={method === "view"}
                            value={form.name ?? ""}
                            onChange={handleChanges}
                            className="input input-secondary w-full"
                            placeholder="Name of the product"
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
                            value={form.descriptions ?? ""}
                            onChange={handleChanges}
                            className="textarea textarea-secondary w-full"
                            placeholder="Describe your product...."
                        ></textarea>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Category
                        </legend>
                        <select
                            name="productCategoryId"
                            onChange={handleChanges}
                            value={form.productCategoryId || ""}
                            disabled={method === "view"}
                            className="input input-secondary w-full"
                            placeholder="Select Category"
                        >
                            <option value="" disabled>
                                --Select Category--
                            </option>
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
                            Edit Product
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                document.getElementById("product_modal").close();
                                deleteProduct(product.id);
                                getProduct();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
}
