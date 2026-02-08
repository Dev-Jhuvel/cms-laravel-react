import RouteList from "../Routes/RouteList";
import { Link, useLocation } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import useThemeStore from "../Stores/useThemeStore";
export default function Guest() {

    const {toggleTheme} = useThemeStore();
    const location = useLocation();
    return (
        <>
            {location.pathname == "/" && (
                <div className="navbar bg-base-100 shadow-sm fixed z-50">
                    <div className="flex-1">
                        <a className="btn btn-ghost font-bold text-2xl">Au Bon</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details className="mr-10">
                                    <summary>
                                        <Ellipsis />
                                    </summary>
                                    <ul className="bg-base-200 rounded-t-none p-2">
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Register</Link>
                                        </li>
                                        <li>
                                            <button onClick={()=> toggleTheme()} >Theme</button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <RouteList />
        </>
    );
}
