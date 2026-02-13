import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";
import useGlobalStore from "../Stores/useGlobalStore";
import Loading from "../Components/Loading";

export default function AuthenticatedRoute({ children }) {
    const { isAuthenticated, getUser } = useAuthStore();
    const { setLoading } = useGlobalStore();

    useEffect(() => {
        getUser()
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
