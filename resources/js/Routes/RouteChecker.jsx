import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";
import useGlobalStore from "../Stores/useGlobalStore";
import Loading from "../Components/Loading";

export default function RouteChecker({ children, mode }) {
    const { isAuthenticated, fetchUser } = useAuthStore();
   

    useEffect(() => {
        fetchUser();
    }, []);

    if(mode === "auth"){
        if(!isAuthenticated){
            return <Navigate to="/login" />
        }
        return children;
    }

    if(mode === "guest"){
        if(isAuthenticated){
            return <Navigate to="/" />
        }
        return children;
    }

    
}
