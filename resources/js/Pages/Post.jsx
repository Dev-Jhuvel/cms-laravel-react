import { useEffect, useState } from "react";
import PostModal from "../Modals/PostModal";
import ViewPostModal from "../Modals/ViewPostModal";
import usePostStore from "../Stores/usePostStore";
import useThemeStore from "../Stores/useThemeStore";
import Pagination from "../Components/Pagination";

export default function Post() {
    const { posts: ApiPost, getPost, links } = usePostStore();
    const { logo } = useThemeStore();
    const [posts, setPost] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const [method, setMethod] = useState('');

    useEffect(() => {
        setPost(null);
        getPost();
    }, []);

    useEffect(() => {
        setPost(ApiPost);
    }, [ApiPost]);

    function truncate(text = "", length = 20) {
        if (!text) return;
        return text.length > length ? text.slice(0, length) + "...." : text;
    }

    return (
        <>
            <div className="w-full h-[95vh] bg-base-200">
                <div className="px-2">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Post
                    </h1>
                    <button
                        className="btn btn-primary"
                        onClick={() =>{
                            document.getElementById("create_post_modal").showModal();
                            setMethod('create');
                        }}
                    >
                        Create New Post
                    </button>
                </div>
                <PostModal method={method} post={selectedPost} setMethod={setMethod} />
                <div className="w-full py-5 px-10">
                    {posts && (
                        <div className="w-full">
                            <div className="flex flex-wrap justify-center gap-2">
                                {Object.entries(posts).map(([key, post]) => (
                                    <div
                                        key={post.id}
                                        className="card bg-base-100 w-80 h-65 shadow-sm group"
                                        onClick={() => { 
                                            document.getElementById( "create_post_modal").showModal();
                                            setMethod('view');
                                            setSelectedPost(post);
                                        }}
                                    >
                                        <div
                                            className="m-3 h-full w-[90%] bg-cover bg-center rounded-xl shadow-2xl overflow-y-scroll group-hover:rounded-t-xl group-hover:w-full group-hover:m-0"
                                            style={{
                                                backgroundImage: `url(${post.image === "" ? logo : post.image})`,
                                            }}
                                        >
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
                                <ViewPostModal post={selectedPost} />
                            </div>
                            <Pagination links={links} onPageChange={getPost} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
