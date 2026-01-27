import { useState } from "react";
import usePostStore from "../Stores/usePostStore";
import useGlobalStore from "../Stores/useGlobalStore";
import useThemeStore from "../Stores/useThemeStore";

export default function ViewPostModal({post}) {
    const defaultForm = {
        title: "",
        descriptions: "",
        image: {},
    };
    const [file, setFile] = useState(null);
    const [form, setForm] = useState(defaultForm);
    const { errors, message, storePost, getPost } = usePostStore();
    const {logo} = useThemeStore();
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setForm({ ...form, image: selectedFile });
    };

    const handleChanges = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById('create_post_modal').close();
        setForm(defaultForm);
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });
        await storePost(formData);
        getPost();
    };
    return (
        <dialog id="view_post_modal" className="modal">
            <div className="modal-box  w-12/12 max-w-7xl">
                <h3 className="text-lg font-bold pb-2"> View Post</h3>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                {post.image && (
                    <div className="w-full h-[50vh] bg-cover bg-center" style={{backgroundImage: `url(${post.image})`}}/>
                )}
                    
                 {/* <form onSubmit={handleSubmit} className="mx-auto"> */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-lg">
                            Title
                        </legend>
                        <input
                            type="text"
                            name="title"
                            disabled
                            value={post.title}
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
                            disabled
                            value={post.descriptions}
                            onChange={handleChanges}
                            className="textarea textarea-secondary w-full"
                            placeholder="Describe your post...."
                        ></textarea>
                    </fieldset>
                    <hr />
                    {/* <div className="modal-action mt-3">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div> */}
                {/* </form> */}
            </div>
        </dialog>
    );
}
