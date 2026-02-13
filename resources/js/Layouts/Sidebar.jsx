import {
    Settings2,
    Sidebar as SidebarIcon,
    ChartNetwork,
    LogOutIcon,
    Star,
    Moon,
    Sun,
    Wallpaper,
    Folders,
    Croissant,
    AlignEndVertical,
} from "lucide-react";
import {
    Link,
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useState } from "react";
import AuthenticatedRoute from "../Routes/AuthenticatedRoute";
import Home from "../Pages/Home";
import Post from "../Pages/Post";
import useAuthStore from "../Stores/useAuthStore";
import useThemeStore from "../Stores/useThemeStore";
import RouteList from "../Routes/RouteList";


export default function Sidebar() {
    const { logout } = useAuthStore();
    const { toggleTheme, theme, logo } = useThemeStore();
    const location = useLocation();
    const currentRoute = location.pathname;

   const pages = [
        { text: "Dashboard", icon: ChartNetwork, url: "/dashboard", click: "" },
        // { text: "Settings", icon: Settings2, url: "/", click: "" },
        { text: "Posts", icon: Wallpaper, url: "/posts", click: "" },
        { text: "Post Categories", icon: Folders, url: "/post_categories", click: "" },
        { text: "Products", icon: Croissant, url: "/products", click: "" },
        { text: "Product Category", icon: AlignEndVertical, url: "/product_categories", click: "" },
        { text: "Theme", icon: theme === 'coffee' ? Moon : Sun, url: "", click:  toggleTheme },
        { text: "Logout", icon: LogOutIcon, url: "", click: () => logout() },
    ];

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-200">
                {/* Navbar */}
                {/* <nav className="navbar w-full bg-base-300">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <SidebarOpen className="block is-drawer-close:hidden" />
                            <SidebarClose className="block is-drawer-open::hidden" />
                            <SidebarIcon />
                        </label>
                        <div className="px-4 font-bold text-2xl">Au Bon</div>
                    </nav> */}
                {/* Page content here */}
                <div className="w-full">
                    <RouteList />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-25 is-drawer-open:w-45">
                    <div className="mt-10 flex items-center justify-center text-center w-full">
                        <p className="font-bold text-4xl w-full text-center is-drawer-close:hidden mb-5">
                            Au bon
                        </p>
                        <img
                            className="w-[90%] hidden is-drawer-close:block rounded-full"
                            src={logo}
                            alt=""
                        />
                    </div>
                    <ul className="menu w-full grow px-2">
                        {Object.entries(pages).map(([key, page]) => {
                            const PageIcon = page.icon;
                            return (
                                <li
                                    key={key}
                                    className={`${page.text === "Theme" ? "mt-auto" : ""} ${page.text === "Dashboard" ? "" : ""}`}
                                >
                                    {page.url ? (
                                        <Link
                                            to={page.url}
                                            className={`btn-square is-drawer-close:tooltip is-drawer-close:tooltip-right ${page.url == currentRoute ? 'bg-base-200' : ''}`}
                                            data-tip={page.text}
                                        >
                                            <PageIcon className="m-auto size-8 is-drawer-open:size-7" />
                                            <span className="is-drawer-close:hidden">
                                                {page.text}
                                            </span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={page.click}
                                            className="btn-square is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip={page.text}
                                        >
                                            <PageIcon className="m-auto size-8 is-drawer-open:size-7"/>
                                            <span className="is-drawer-close:hidden">
                                                {page.text}
                                            </span>
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                        <li>
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="open sidebar"
                                className="btn btn-ghost border-none "
                            >
                                <SidebarIcon className="m-auto size-8 is-drawer-open:size-7" />
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
