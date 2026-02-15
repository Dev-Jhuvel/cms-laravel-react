import { useEffect, useState } from "react";
export default function Slider({posts}) {
    const [index, setIndex] = useState(0);


    useEffect(() => {
       if(posts){
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % posts.length);
        }, 3000);
        return () => clearInterval(timer);
       }
    }, [posts]);

    return (
        <>
        <h1></h1>
            {posts && (
                <div className="carousel w-full flex relative">
                    {posts.map((post, i) => (
                    <div key={post.id} className="carousel-item w-full h-screen bg-cover bg-center bg-no-repeat"
                        style={{ transform: `translateX(-${index * 100}%)`, backgroundImage: `url(${post.image})`, }}
                    >
                        <div className="mx-auto mt-auto mb-10 flex gap-4">
                        {posts.map((posts, i) => (
                            <button 
                            className={`btn btn-xs btn-circle text-7xl ${index === i ? 'btn-primary' : ''}`} 
                            key={posts.id} 
                            onClick={() => setIndex(i)}>
                            </button>
                        ))}
                    </div>
                    </div>
                    ))}
                </div>
            )}
        </>
    );
}
