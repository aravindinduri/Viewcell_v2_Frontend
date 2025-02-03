import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { toast } from "react-toastify";
import { setUser } from "../../store/authSlice";
import axiosInstance from "../../utils/axios.helper";

function EditChannelInfo() {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const defaultValues = {
        username: userData?.username || "",
        description: userData.description || "",
    };
    const [data, setData] = useState(defaultValues);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleSaveChange = async (newData) => {
        if (defaultValues.username === newData?.username) {
            newData = { ...newData, username: "" };
        }
        try {
            const response = await axiosInstance.patch(
                `/users/update-account`,
                newData
            );
            dispatch(setUser(response.data.data));
            toast.success(response.data.message);
        } catch (error) {
            if (error.status === 409) {
                toast.error("Username already exists");
            } else {
                toast.error("Couldn't update account details. Try again!");
            }
            console.log("Error while updating account details", error);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-y-6 py-6 bg-gray-900">
            <div className="w-full sm:w-1/2 lg:w-1/3 text-center">
                <h5 className="text-xl font-semibold text-white mb-2">
                    Channel Info
                </h5>
                <p className="text-gray-400">
                    Update your channel details here.
                </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
                <form
                    onSubmit={handleSubmit(handleSaveChange)}
                    className="space-y-6"
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-white"
                        >
                            Username
                        </label>
                        <div className="flex rounded-lg border">
                            <p className="flex shrink-0 items-center border-r border-white px-3 align-middle text-gray-400">
                            viewcell.onrender.com/                            </p>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-3 mt-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter your username"
                                required
                                defaultValue={userData.username}
                                {...register("username", {
                                    required: "Username is required",
                                    maxLength: {
                                        value: 25,
                                        message: "Username cannot exceed 25 characters",
                                    },
                                })}
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="desc"
                            className="block text-sm font-medium text-white"
                        >
                            Description
                        </label>
                        <div className="relative">
                            <textarea
                                placeholder="Enter your channel description"
                                name="desc"
                                id="desc"
                                className="w-full px-4 py-3 mt-2 bg-transparent text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                rows="3"
                                defaultValue={userData.description}
                                {...register("description", {
                                    maxLength: {
                                        value: 200,
                                        message: "Description cannot exceed 200 characters",
                                    },
                                })}
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {errors.description && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.description.message}
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

export default EditChannelInfo;
