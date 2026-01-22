import { useState } from "react";
import PostModal from "../Modals/PostModal";

export default function Post() {
    const [isShown, setIsShown]  = useState(false);
    return (
        <>
            <div className="w-full h-screen bg-[var(--background)]">
                <div className="border border-black m-auto">
                    <h1 className="text-[var(--background-text)] text-center text-2xl font-bold">
                        Manage Post
                    </h1>
                    <button
                        type="button"
                        className="button-primary"
                        onClick={()=>{setIsShown(true); console.log(isShown)}}
                    >
                        Create New Post
                    </button>
                </div>
               {isShown &&  <PostModal setHidden={() => setIsShown(false)} />}
            </div>
        </>
    );
}
