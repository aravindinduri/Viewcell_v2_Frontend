import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios.helper.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const response = await axiosInstance.post("/users/login", data);
            if (response?.data?.data) {
                dispatch(setUser(response.data.data.user));
                localStorage.setItem("accessToken", response.data.data.accessToken);
                toast.success(response.data.message + " 🎉");
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0D1117] relative overflow-hidden">
            {/* Background SVG */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <svg viewBox="0 0 1440 320" className="w-full h-full">
                    <path fill="#1DB954" fillOpacity="0.5"
                        d="M0,160L60,154.7C120,149,240,139,360,138.7C480,139,600,149,720,160C840,171,960,181,1080,176C1200,171,1320,149,1380,138.7L1440,128V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
                    ></path>
                </svg>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-[#161B22] rounded-lg shadow-lg p-8 relative z-10 border border-green-600">
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-500">Welcome Back</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-green-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm text-gray-300">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-2 mt-1 bg-[#0D1117] border border-green-600 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none text-white"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm text-gray-300">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            placeholder="********"
                            className="w-full p-2 mt-1 bg-[#0D1117] border border-green-600 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none text-white"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-all"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
