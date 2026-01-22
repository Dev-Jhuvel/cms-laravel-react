import { useState } from "react";
import { upload } from "../Services/postService";

export default function PostModal({ setHidden }) {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        const url = await upload(formData);
        console.log(url);
    };
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-3xl max-h-full mx-auto">
                <div className="relative bg-[var(--accent)] border border-black rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-2xl font-bold text-[var(--accent-text)]">
                            Create a new Post
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <label className="text-xl">Title:</label>
                            <input
                                type="text"
                                placeholder="Enjoy our all time favorite breads!"
                                className="rounded-xl px-2 py-1 w-full bg-[var(--secondary)] max-sm:py-2 text-[var(--accent-text)]"
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-xl">Description:</label>
                            <textarea
                                type="text"
                                placeholder="Describe your post"
                                className="rounded-xl px-2 py-1 w-full bg-[var(--secondary)] max-sm:py-2 text-[var(--accent-text)]"
                            ></textarea>
                        </div>
                        <div className="py-2 space-x-2">
                            <label className="text-xl">Image:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                placeholder="Describe your post"
                                className="rounded-xl px-2 py-1 w-[20%] bg-[var(--secondary)] max-sm:py-2 text-[var(--accent-text)]"
                            />
                        </div>
                        <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                            <div className="flex-1"></div>
                            <button
                                type="button"
                                onClick={setHidden}
                                className="button-secondary"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="button-primary">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
