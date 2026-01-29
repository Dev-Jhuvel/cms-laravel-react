import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import {BrowserRouter as Router } from "react-router-dom";
import useAuthStore from "./Stores/useAuthStore.js";
import useThemeStore from "./Stores/useThemeStore.js";
import "../css/app.css";
import useGlobalStore from "./Stores/useGlobalStore.js";
import Loading from "./Components/Loading.jsx";
import Sidebar from "./Layouts/Sidebar.jsx";
import Guest from "./Layouts/Guest.jsx";

const App = () => {
    const { isAuthenticated } = useAuthStore();
    const { theme } = useThemeStore();
    const { loading, message, clearMessage } = useGlobalStore();
    useEffect(() => {
        if (message) {
            message.type === "success"
                ? toast.success(message.text)
                : toast.error(message.text);
        }
        clearMessage();
    }, [message]);
    return (
        <div data-theme={theme} className="h-screen">
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                {loading && <Loading />}
                { isAuthenticated ? <Sidebar /> : <Guest />}
            </Router>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
