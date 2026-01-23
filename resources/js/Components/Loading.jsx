import loading_bread from "../../images/loading_bread.png";

export default function Loading(){
    return <div className="w-full h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-[var(--background)]">
        <img src={loading_bread} className="size-60 animate-spin" alt="" />
    </div>
}