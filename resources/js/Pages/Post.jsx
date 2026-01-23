import { useEffect, useState } from "react";
import PostModal from "../Modals/PostModal";
import usePostStore from "../Stores/usePostStore";

export default function Post() {
    const [isShown, setIsShown] = useState(false);
    const { posts: ApiPost, getPost } = usePostStore();
    const [posts, setPost] = useState([]);

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        setPost(ApiPost);
    }, [ApiPost]);
    return (
        <>
            <div className="w-full h-[95vh] bg-[var(--background)]">
                <div className="m-auto">
                    <h1 className="text-[var(--background-text)] text-center text-2xl font-bold">
                        Manage Post
                    </h1>
                    <button
                        type="button"
                        className="button-primary"
                        onClick={() => {
                            setIsShown(true);
                        }}
                    >
                        Create New Post
                    </button>
                </div>
                {isShown && <PostModal setHidden={() => setIsShown(false)} />}
                <div className="w-full py-5">
                    {posts && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {Object.entries(posts).map(([key, value]) => (
                                <div key={value.id} className="w-50 h-60 border border-black rounded-2xl">
                                    <div className="w-full h-[70%]">
                                        <img src={value.image} className="w-full h-full rounded-t-2xl" alt="" />
                                    </div>
                                    <p className="font-bold text-lg text-center">{value.title}</p>
                                    <p className="">{value.descriptions}</p>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
