import { Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import { useEffect } from "react";

export default function GuestRoute({ children }) {
    const { isAuthenticated, fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return children;
}
