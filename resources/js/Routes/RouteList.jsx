import { Route, Routes } from "react-router-dom";
import RouteChecker from "./RouteChecker";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Post from "../Pages/Post";
import Category from "../Pages/Category";
import Dashboard from "../Pages/Dashboard";
export default function RouteList() {
    return (
        <Routes>
            {/* AUTH */}
            <Route
                path="/dashboard"
                element={
                    <RouteChecker mode="auth">
                        <Dashboard />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/posts"
                element={
                    <RouteChecker mode="auth">
                        <Post />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/categories"
                element={
                    <RouteChecker mode="auth">
                        <Category />
                    </RouteChecker>
                }
            ></Route>
            {/* GUEST */}
            <Route
                path="/"
                element={
                    <RouteChecker mode="guest">
                        <Home />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/register"
                element={
                    <RouteChecker mode="guest">
                        <Register />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/login"
                element={
                    <RouteChecker mode="guest">
                        <Login />
                    </RouteChecker>
                }
            ></Route>
        </Routes>
    );
}
