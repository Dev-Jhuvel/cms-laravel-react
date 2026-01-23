import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";
import useGlobalStore from "../Stores/useGlobalStore";

export default function AuthenticatedRoute({ children }) {
    const { isAuthenticated, fetchUser } = useAuthStore();
    const { setLoading } = useGlobalStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
