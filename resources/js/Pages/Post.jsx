import { useEffect, useState } from "react";
import PostModal from "../Modals/PostModal";
import usePostStore from "../Stores/usePostStore";

export default function Post() {
    const { posts: ApiPost, getPost } = usePostStore();
    const [posts, setPost] = useState([]);

    useEffect(() => {
        setPost(null);
        getPost();
    }, []);

    useEffect(() => {
        setPost(ApiPost);
    }, [ApiPost]);
    return (
        <>
            <div className="w-full h-full bg-base-200">
                <div className="px-2">
                    <h1 className="text-primary text-center text-3xl font-bold">
                        Manage Post
                    </h1>
                    <button className="btn btn-primary" onClick={() => document.getElementById('create_post_modal').showModal()}>Create New Post</button>
                </div>
                <PostModal/>
                <div className="w-full py-5">
                    {posts && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {Object.entries(posts).map(([key, value]) => (
                              
                                <div key={value.id} className="card bg-base-100 w-70 shadow-sm group">
                                    <figure className="px-5 pt-5 w-full group-hover:p-0">
                                        <img
                                        src={value.image}
                                        alt="Card image"
                                        className="rounded-xl" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{value.title}</h2>
                                        <p className="group-hover:hidden">{value.descriptions}</p>
                                        {/* <div className="card-actions">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
