import loading_bread from "../../images/loading_bread.png";

export default function Loading(){
    return <div className="w-full h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex flex-col justify-center items-center bg-base-300">
        <img src={loading_bread} className="size-60 animate-spin" alt="" />
        <p className="text-3xl bold text-center">Loading......</p>
    </div>
}