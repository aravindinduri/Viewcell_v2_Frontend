import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios.helper.js";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const signup = async (data) => {
        const formData = new FormData();
        for (const key in data) formData.append(key, data[key]);
        formData.append("avatar", data.avatar[0]);

        if (data.coverImage) formData.append("coverImage", data.coverImage[0]);

        setError("");
        setLoading(true);
        try {
            const response = await axiosInstance.post("/users/register", formData);
            if (response?.data?.data) {
                toast.success("Account created successfully 🎉");
                navigate("/login");
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

            {/* SignUp Card */}
            <div className="w-full max-w-md bg-[#161B22] rounded-lg shadow-lg p-8 relative z-10 border border-green-600">
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-500">Create an Account</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-400 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(signup)} className="mt-6 space-y-4">
                    {/* Input Fields */}
                    {[
                        { name: "fullName", type: "text", label: "Full Name", placeholder: "John Doe" },
                        { name: "username", type: "text", label: "Username", placeholder: "your_username" },
                        { name: "email", type: "email", label: "Email", placeholder: "you@example.com" },
                        { name: "password", type: "password", label: "Password", placeholder: "********" },
                    ].map(({ name, type, label, placeholder }) => (
                        <div key={name}>
                            <label className="block text-sm text-gray-300">{label}</label>
                            <input
                                {...register(name, { required: `${label} is required` })}
                                type={type}
                                placeholder={placeholder}
                                className="w-full p-2 mt-1 bg-[#0D1117] border border-green-600 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none text-white"
                            />
                            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
                        </div>
                    ))}

                    {/* Avatar Upload */}
                    <div>
                        <label className="block text-sm text-gray-300">Avatar</label>
                        <input
                            type="file"
                            {...register("avatar", {
                                required: "Avatar is required",
                                validate: (file) =>
                                    ["image/jpeg", "image/png", "image/jpg"].includes(file[0]?.type) ||
                                    "Only .png, .jpg, .jpeg files are allowed",
                            })}
                            className="w-full p-2 mt-1 bg-[#0D1117] border border-green-600 rounded-md text-white"
                        />
                        {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition-all"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
