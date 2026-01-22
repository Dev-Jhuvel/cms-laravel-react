import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import useAuthStore from "./Stores/useAuthStore.js";
import useThemeStore from "./Stores/useThemeStore.js";
import Home from "./Pages/Home.jsx";
import AuthenticatedRoute from "./Components/AuthenticatedRoute.jsx";
import GuestRoute from "./Components/GuestRoute.jsx";
import Post from "./Pages/Post.jsx";
import '../css/app.css';


const App = () => {
    const [isDark, setIsDark] = useState(false);
    const { user, isAuthenticated, logout, message } = useAuthStore();
    const { toggleTheme: storeToggleTheme  } = useThemeStore();
    useEffect(() => {
        if (message) {
            console.log(message);
            message.type === "success"
                ? toast.success(message.text)
                : toast.error(message.text);
        }
    }, [message]);
    function toggleTheme(){
        setIsDark(!isDark)
        const theme = isDark ? 'dark' : 'light';
        console.log(theme);
        storeToggleTheme();
    }
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <nav className="bg-[var(--background)]">
                   <ul className="flex items-center justify-between">
                        {isAuthenticated && 
                            <>
                                <li>
                                    <Link to="/home" className="text-[var(--primary)] font-bold text-xl mx-3">Home</Link>
                                </li>
                                <li>
                                    <Link to="/post" className="text-[var(--primary)] font-bold text-xl mx-3">Post</Link>
                                </li>
                            </>
                        }
                       
                        <li>
                            <button onClick={()=> {toggleTheme()}} className="text-[var(--primary)] font-bold text-xl mx-3">{isDark ? 'Dark' : 'Light'}</button>
                        </li>
                        {isAuthenticated && 
                            <li>
                                <button onClick={()=> {logout()}} className="text-[var(--primary)] font-bold text-xl mx-3">Logout</button>
                            </li>
                        }
                   </ul>
                </nav>
                <Routes>
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <Register />
                            </GuestRoute>
                        }
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        }
                    ></Route>
                    <Route
                        path="/home"
                        element={
                            <AuthenticatedRoute>
                                <Home />
                            </AuthenticatedRoute>
                        }
                    ></Route>
                    <Route
                        path="/post"
                        element={
                            <AuthenticatedRoute>
                                <Post />
                            </AuthenticatedRoute>
                        }
                    ></Route>
                    <Route
                        path="/"
                        element={
                            <AuthenticatedRoute>
                                <Home />
                            </AuthenticatedRoute>
                        }
                    ></Route>
                </Routes>
            </Router>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
