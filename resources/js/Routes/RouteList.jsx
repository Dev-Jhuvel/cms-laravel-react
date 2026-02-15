import { Route, Routes } from "react-router-dom";
import RouteChecker from "./RouteChecker";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PostPage from "../Pages/PostPage";
import PostCategoryPage from "../Pages/PostCategoryPage";
import ProductCategoryPage from "../Pages/ProductCategoryPage";
import DashboardPage from "../Pages/DashboardPage";
import ProductPage from "../Pages/ProductPage";
import MenuPage from "../Pages/MenuPage";
export default function RouteList() {
    return (
        <Routes>
            {/* AUTH */}
            <Route
                path="/dashboard"
                element={
                    <RouteChecker mode="auth">
                        <DashboardPage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/posts"
                element={
                    <RouteChecker mode="auth">
                        <PostPage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/post_categories"
                element={
                    <RouteChecker mode="auth">
                        <PostCategoryPage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/product_categories"
                element={
                    <RouteChecker mode="auth">
                        <ProductCategoryPage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/products"
                element={
                    <RouteChecker mode="auth">
                        <ProductPage />
                    </RouteChecker>
                }
            ></Route>
            {/* GUEST */}
            <Route
                path="/"
                element={
                    <RouteChecker mode="guest">
                        <HomePage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/register"
                element={
                    <RouteChecker mode="guest">
                        <RegisterPage />
                    </RouteChecker>
                }
            ></Route>
            <Route
                path="/login"
                element={
                    <RouteChecker mode="guest">
                        <LoginPage />
                    </RouteChecker>
                }
        ></Route>
             <Route
                path="/menu"
                element={
                    <RouteChecker mode="guest">
                        <MenuPage />
                    </RouteChecker>
                }
            ></Route>
        </Routes>
    );
}
