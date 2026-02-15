

export default function Pagination({ links, onPageChange }) {

    function decodeHtml(html) {
        const text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    }
    return (
        <>
            {links && links.length > 3 && (
                <div className="join flex justify-center items-end mt-5">
                    {Object.entries(links).map(([index, link]) => {
                        return (
                            <button
                                key={index}
                                disabled={!link.url}
                                className={`join-item btn btn-outline disabled:border-primary ${link.active ? "bg-base-300  " : ""}`}
                                onClick={() => { link.url && onPageChange(link.url)}}
                            >
                                {decodeHtml(link.label)}
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
}
