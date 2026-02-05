import RouteList from "../Routes/RouteList";
import { Link, useLocation } from "react-router-dom";
import { Ellipsis } from "lucide-react";
export default function Guest() {
    const location = useLocation();
    return (
        <>
            {location.pathname == "/" && (
                <div className="navbar bg-base-100 shadow-sm fixed z-50">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">Au Bon</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details className="mr-10">
                                    <summary>
                                        <Ellipsis />
                                    </summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Register</Link>
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
