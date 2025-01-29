import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../Logo";
import Input from "../Input";
import Button from "../Button";
import { icons } from "../../assets/Icons.jsx";
import axiosInstance from "../../utils/axios.helper.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const response = await axiosInstance.post("/users/login", data);
            if (response?.data?.data) {
                dispatch(setUser(response.data.data.user));
                localStorage.setItem(
                    "accessToken",
                    response.data.data.accessToken
                );
                toast.success(response.data.message + "🤩");
                navigate("/");
            }
        } catch (error) {
            if (error.status === 401) {
                setError("Invalid password");
            } else if (error.status === 500) {
                setError("Server is not working");
            } else if (error.status === 404) {
                setError("User does not exist");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="h-screen w-full overflow-y-auto bg-[#121212] text-white relative"
            style={{
                backgroundColor: "#121212",
            }}
        >
            {/* Animated SVG background */}
            <div className="absolute inset-0 z-0">
                <svg
                    className="moving-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: "absolute", top: 0, left: 0 }}
                >
                    <circle cx="50" cy="50" r="30" fill="rgba(255, 255, 255, 0.2)">
                        <animate
                            attributeName="cx"
                            values="50;150;50"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="150" cy="150" r="25" fill="rgba(255, 255, 255, 0.3)">
                        <animate
                            attributeName="cy"
                            values="150;50;150"
                            dur="12s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="200" cy="200" r="20" fill="rgba(255, 255, 255, 0.4)">
                        <animate
                            attributeName="cx"
                            values="200;50;200"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            </div>

            <div className="mx-auto my-28 flex w-full max-w-sm flex-col px-4 relative z-10">
                <div className="mx-auto inline-block">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="my-4 w-full text-center text-2xl font-bold text-gradient">
                    Log in to your account
                </div>
                {error && (
                    <p className="text-red-600 mt-4 text-center">{error}</p>
                )}
                <form
                    onSubmit={handleSubmit(login)}
                    className="mx-auto mt-2 flex w-full max-w-sm flex-col px-4"
                >
                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        className="input-field"
                        required
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                        value
                                    ) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-600 px-2 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                    {errors.email?.type === "required" && (
                        <p className="text-red-600 px-2 mt-1">
                            Email is required
                        </p>
                    )}
                    <Input
                        label="Password"
                        className="input-field"
                        className2="pt-5"
                        type="password"
                        placeholder="Enter your password"
                        required
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <p className="text-red-600 px-2 mt-1">
                            Password is required
                        </p>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-5 disabled:cursor-not-allowed py-2 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                        bgColor={loading ? "bg-green-800" : "bg-green-600"}
                    >
                        {loading ? <span>{icons.loading}</span> : "Sign in"}
                    </Button>
                </form>
                <h6 className="mx-auto mt-4">
                    Don't have an Account yet?{" "}
                    <Link
                        to={"/signup"}
                        className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                        Sign up now
                    </Link>
                </h6>
            </div>
        </div>
    );
}

export default Login;
