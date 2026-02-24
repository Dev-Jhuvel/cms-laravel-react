import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import PostModal from "../Modals/PostModal";
import usePostStore from "../Stores/usePostStore";
import useThemeStore from "../Stores/useThemeStore";
import Pagination from "../Components/Pagination";
import usePostCategoryStore from "../Stores/usePostCategoryStore";

export default function PostPage() {
    const { posts, getPost, links } = usePostStore();
    const { logo } = useThemeStore();
    const [filterPostCategory, setFilterPostCategory] = useState("");
    const [selectedPost, setSelectedPost] = useState({});
    const {postCategories, getPostCategory } = usePostCategoryStore();
    const [method, setMethod] = useState("");

    const truncate = (text = "", length = 20) => {
        if (!text) return;
        return text.length > length ? text.slice(0, length) + "...." : text;
    };

    const handleChanges = (e) => {
        setFilterPostCategory(e.target.value);
    };

    useEffect(() => {
        getPostCategory();
    }, []);

    useEffect(() => {
        getPost(null, filterPostCategory);
    }, [filterPostCategory]);

    return (
        <>
            <div className="w-full bg-base-200 ">
                <div className="px-2 pt-10">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Posts
                    </h1>
                    <div className="w-full flex gap-5 items-center">
                        <button
                            className="btn btn-primary ml-5"
                            onClick={() => {
                                document.getElementById("post_modal").showModal();
                                setMethod("create");
                            }}
                        >
                            Create New Post
                        </button>
                        <fieldset className="fieldset">
                            {/* <legend className="fieldset-legend text-lg">
                                Category
                            </legend> */}
                            <select
                                name="postCategoryId"
                                onChange={handleChanges}
                                // onChange={(e)=>debouncedFilter(e.target.value)}
                                value={filterPostCategory || ""}
                                // disabled={method === 'view'}
                                className="input input-secondary w-full"
                                placeholder="Select Category"
                            >
                                <option value="">All Categories</option>
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
                        </fieldset>
                    </div>
                </div>
                <PostModal method={method} post={selectedPost} setMethod={setMethod} />
                <div className="w-full py-5 px-10">
                    {posts ? (
                        <div className="w-full">
                            <div className="flex flex-wrap justify-center gap-2 h-[72vh]">
                                {posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="card bg-base-100 w-80 h-65 shadow-sm group"
                                        onClick={() => {
                                            document.getElementById("post_modal").showModal();
                                            setMethod("view");
                                            setSelectedPost(post);
                                        }}
                                    >
                                        <div
                                            className="m-3 h-full w-[90%] bg-cover bg-center rounded-xl shadow-2xl overflow-y-scroll group-hover:rounded-t-xl group-hover:w-full group-hover:m-0 relative"
                                            style={{ backgroundImage: `url(${post.image === "" ? logo : post.image})`}}
                                        >
                                            <div className="text-primary text-center font-bold bg-primary-content rounded-2xl px-2 py-1 right-2 top-2 absolute">
                                                {post.post_category.name}
                                            </div>
                                            {/* <img
                                        src={post.image === '' ? logo : post.image}
                                        alt="Card image"
                                        className="rounded-xl shadow-2xl group-hover:rounded-none" /> */}
                                        </div>
                                        <div className="items-center pb-5 group-hover:pb-3">
                                            <h2 className="text-center font-bold text-sm group-hover:text-base">
                                                {truncate(post.title)}
                                            </h2>
                                            <p className="text-center text-xs group-hover:hidden">
                                                {truncate(post.descriptions)}
                                            </p>
                                            {/* <div className="card-actions">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                links={links}
                                onPageChange={(url) =>
                                    getPost(url, filterPostCategory)
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
