import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";

export default function AuthenticatedRoute({ children }) {
    const { isAuthenticated, fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
