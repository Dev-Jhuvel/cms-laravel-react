import RouteList from "../Routes/RouteList";
import { Link, useLocation } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import useThemeStore from "../Stores/useThemeStore";
import { useEffect, useState } from "react";
export default function Guest() {
    const {toggleTheme} = useThemeStore();
    const location = useLocation();
    const [visible, setVisible] = useState(true);

    useEffect(() =>{
        const handleScroll = () =>{
            if(window.scrollY === 0){
                setVisible(true);
            }else{
                setVisible(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[])
    return (
        <>
            {(location.pathname == "/" || location.pathname == "/menu") && (
                <div className={`navbar bg-base-300 shadow-sm fixed z-50 duration-300 transition-transform ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost font-bold text-2xl">Au Bon</Link>
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
