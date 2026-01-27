import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";
import useGlobalStore from "../Stores/useGlobalStore";
import Loading from "./Loading";

export default function AuthenticatedRoute({ children }) {
    const { isAuthenticated, fetchUser } = useAuthStore();
    const { setLoading, loading } = useGlobalStore();

    useEffect(() => {
        setLoading(true);
        fetchUser().finally(() =>setLoading(false));
    }, [fetchUser, setLoading]);

    if(loading){
        return <Loading />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
