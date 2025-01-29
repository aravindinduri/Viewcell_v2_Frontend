import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios.helper";

function ChangePassword() {
    const defaultValues = {
        oldPassword: "",
        newPassword: "",
        confPassword: "",
    };
    const [data, setData] = useState(defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleSaveChange = async (newdata) => {
        if (data?.newPassword !== data?.confPassword) {
            toast.error("Confirm Password not matching");
            return;
        }
        try {
            const response = await axiosInstance.post(
                `/users/change-password`,
                newdata
            );
            toast.success(response.data.message);
        } catch (error) {
            if (error.status === 400) {
                toast.error("Invalid current password");
            } else {
                toast.error("Couldn't update password. Try again!");
            }
            console.log("Error while updating password", error);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-y-6 py-6 bg-gray-900">
            <div className="w-full sm:w-1/2 lg:w-1/3 text-center">
                <h5 className="text-xl font-semibold text-white mb-2">
                    Change Password
                </h5>
                <p className="text-gray-400">Update your account password.</p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
                <form
                    onSubmit={handleSubmit(handleSaveChange)}
                    className="space-y-6"
                >
                    <div>
                        <label
                            htmlFor="old-pwd"
                            className="block text-sm font-medium text-white"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="old-pwd"
                            className="w-full px-4 py-3 mt-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your current password"
                            required
                            {...register("oldPassword", { required: "This field is required" })}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    oldPassword: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="new-pwd"
                            className="block text-sm font-medium text-white"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-pwd"
                            className="w-full px-4 py-3 mt-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your new password"
                            required
                            {...register("newPassword", {
                                required: "New password is required",
                                validate: {
                                    passLength: (value) =>
                                        value.length > 8 ||
                                        "Password must be more than 8 characters",
                                },
                            })}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    newPassword: e.target.value,
                                }))
                            }
                        />
                        {errors.newPassword && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="cnf-pwd"
                            className="block text-sm font-medium text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cnf-pwd"
                            className="w-full px-4 py-3 mt-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Confirm your new password"
                            required
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    confPassword: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <hr className="border-gray-600" />

                    {/* Buttons */}
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
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
