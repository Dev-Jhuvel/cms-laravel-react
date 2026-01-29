import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GuestRoute from "../Components/GuestRoute";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

export default function Guest() {
    return (
        <>
            {/* <nav className="bg-base-200 h-[5vh]">
                <ul className="flex items-center justify-between">
                    <li>
                        <Link
                            to="/register"
                            className="text-accent font-bold text-xl mx-3"
                        >
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="text-accent font-bold text-xl mx-3"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav> */}
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
            </Routes>
        </>
    );
}
