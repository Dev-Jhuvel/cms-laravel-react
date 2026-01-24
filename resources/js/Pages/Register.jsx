import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import breads from "../../images/breads.jpg";
import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../Stores/useAuthStore";
import useThemeStore from "../Stores/useThemeStore";

export default function Register() {
    const {
        user,
        isAuthenticated,
        register,
        errors: authError,
        authResetter,
    } = useAuthStore();

    const {logo} = useThemeStore();

    const defaultForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const [form, setForm] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    function handleChanges(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await register(form);
    }

    useEffect(() => {
        if (authError) {
            setErrors(authError);
        }
    }, [authError, setErrors]);

    return (
        <div className="bg-white flex items-center justify-center h-[95vh]">
            <div className="bg-base-200 w-[80%] m-auto rounded-2xl flex shadow-lg max-sm:w-full max-sm:rounded-none max-sm:bg-[url('../images/breads.jpg')] bg-cover">
                <div className="w-[40%] h-[90vh] rounded-l-2xl relative max-sm:w-full max-sm:h-screen backdrop-blur-xs">
                    <div className="w-full h-[23%] max-sm:size-25 m-auto">
                        <img
                            className="size-25 max-sm:size-18 mt-3 md:ml-5 rounded-full inline-flex"
                            src={logo}
                            alt=""
                        />
                    </div>
                    <div className="w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full m-auto gap-y-3 max-sm:w-full px-10 max-sm:gap-y-5 "
                        >
                            <h1 className="text-primary text-center font-bold text-2xl p-4 max-sm:text-white max-sm:text-3xl">
                                Create an Account
                            </h1>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChanges}
                                    placeholder="Full Name"
                                    className="input input-secondary w-full"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs pl-2">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChanges}
                                    placeholder="Email"
                                    className="input input-secondary w-full"
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
                                    className="input input-secondary w-full"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs pl-2">
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChanges}
                                placeholder="Confirm Password"
                                    className="input input-secondary w-full text-primary"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                            <p className="text-primary">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    onClick={() => {
                                        authResetter();
                                    }}
                                    className="link link-accent underline text-center"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="w-[60%] m-auto max-sm:hidden flex items-center justify-center">
                    <div className="bg-[url('../images/breads.jpg')] bg-cover h-[85vh] rounded-2xl w-[94%] "></div>
                </div>
            </div>
        </div>
    );
}
