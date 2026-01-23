import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import breads from "../../images/breads.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import useThemeStore from "../Stores/useThemeStore";

export default function Login() {
    const {
        user,
        isAuthenticated,
        login,
        errors: authError,
        authResetter,
    } = useAuthStore();

    const {logo} = useThemeStore()
    const defaultForm = {
        email: "",
        password: "",
    };

    const [form, setForm] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    function handleChanges(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await login(form);
    }

    useEffect(() => {
        if (authError) {
            setErrors(authError);
        }
    }, [authError, setErrors]);

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="bg-white flex items-center justify-center h-[95vh]">
            <div className="bg-[var(--background)] w-[80%] m-auto rounded-2xl flex shadow-lg max-sm:w-full max-sm:rounded-none max-sm:bg-[url('../images/breads.jpg')] bg-cover">
                <div className="w-[60%] m-auto max-sm:hidden flex items-center justify-center">
                    <div className="bg-[url('../images/breads_eggs.jpg')] bg-cover h-[85vh] rounded-2xl w-[94%] "></div>
                </div>
                <div className="w-[40%] h-[90vh] rounded-l-2xl relative max-sm:w-full max-sm:h-screen backdrop-blur-xs">
                    <div className="w-full h-[30%] max-sm:size-25 m-auto">
                        <img
                            className="size-25 max-sm:size-18 mt-3 rounded-full inline-flex"
                            src={logo}
                            alt=""
                        />
                    </div>
                    <div className="w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full m-auto gap-y-3 max-sm:w-full px-10 max-sm:gap-y-5 "
                        >
                            <h1 className="text-[var(--background-text)] text-center font-bold text-2xl p-4 max-sm:text-white max-sm:text-3xl">
                                Create an Account
                            </h1>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChanges}
                                    placeholder="Email"
                                    className="rounded-xl px-2 py-1 w-full bg-[var(--accent)] max-sm:py-2 text-[var(--accent-text)]"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs pl-2">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChanges}
                                    placeholder="Password"
                                    className="rounded-xl px-2 py-1 w-full bg-[var(--accent)] max-sm:py-2 text-[var(--accent-text)]"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs pl-2">
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-[var(--primary)] py-1 text-[var(--primary-text)] rounded-xl max-sm:py-2"
                            >
                                Submit
                            </button>
                            <p className="text-[var(--background-text)]">
                                Create an account?{" "}
                                <Link
                                    to="/register"
                                    onClick={() => {
                                        authResetter();
                                    }}
                                    className="text-[var(--accent)] underline text-center"
                                >
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
