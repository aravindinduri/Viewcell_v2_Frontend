import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { GoMail } from "react-icons/go";
import Button from "../Button";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";
import { setUser } from "../../store/authSlice";

function EditPersonalInfo() {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const defaultValues = {
        fullName: userData.fullName,
        email: userData.email,
    };
    const [data, setData] = useState(defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleSaveChange = async (data) => {
        try {
            const response = await axiosInstance.patch(
                `/users/update-account`,
                data
            );
            dispatch(setUser(response.data.data));
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Couldn't update account details. Try again!");
            console.log("Error while updating account details", error);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-y-6 py-6 bg-gray-900">
            <div className="w-full sm:w-1/2 lg:w-1/3 text-center">
                <h5 className="text-xl font-semibold text-white mb-2">
                    Personal Info
                </h5>
                <p className="text-gray-400">
                    Update your photo and personal details here.
                </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
                <form
                    onSubmit={handleSubmit(handleSaveChange)}
                    className="space-y-6"
                >
                    <div>
                        <label
                            htmlFor="fullname"
                            className="block text-sm font-medium text-white"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            className="w-full px-4 py-3 mt-2 border border-gray-600 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your full name"
                            required
                            defaultValue={userData.fullName}
                            {...register("fullName", {
                                required: "Full name is required",
                                maxLength: {
                                    value: 25,
                                    message: "Full name cannot exceed 25 characters",
                                },
                            })}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    fullName: e.target.value,
                                }))
                            }
                        />
                        {errors.fullName && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-[50%] -translate-y-1/2 text-gray-400">
                                <GoMail />
                            </div>
                            <input
                                placeholder="Enter your email address"
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 mt-2 pl-10 border border-gray-600 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                                defaultValue={userData.email}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                value
                                            ) ||
                                            "Please enter a valid email address",
                                    },
                                })}
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <hr className="border-gray-600" />
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <Button
                            onClick={() => {
                                reset();
                                setData(defaultValues);
                            }}
                            disabled={
                                JSON.stringify(data) ===
                                JSON.stringify(defaultValues)
                            }
                            className="px-6 py-3 rounded-lg border border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                JSON.stringify(data) ===
                                JSON.stringify(defaultValues)
                            }
                            className="px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPersonalInfo;
