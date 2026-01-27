

export default function Pagination({ links, onPageChange }) {

    function decodeHtml(html) {
        const text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    }
    return (
        <>
            {links && (
                <div className="join flex justify-center items-end mt-5">
                    {Object.entries(links).map(([index, link]) => {
                        return (
                            <button
                                key={index}
                                disabled={!link.url}
                                className={`join-item btn ${link.active ? "btn-active" : "disable"}`}
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
