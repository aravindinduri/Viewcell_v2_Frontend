import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Image, FileVideo } from "lucide-react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";

function VideoForm({ video = false }, ref) {
    const dialog = useRef();
    const [showPopup, setShowPopup] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: video?.title || "",
            description: video?.description || "",
        },
    });

    useImperativeHandle(
        ref,
        () => ({
            open() {
                setShowPopup(true);
            },
            close() {
                dialog.current?.close();
            },
        }),
        []
    );

    useEffect(() => {
        if (showPopup) {
            dialog.current?.showModal();
        }
    }, [showPopup]);

    const handleVideo = async (data) => {
        try {
            toast.success(video ? "Video updated" : "Video uploaded");
            dialog.current?.close();
        } catch (error) {
            toast.error("Upload failed");
        }
    };

    return (
        <div>
            {showPopup &&
                createPortal(
                    <dialog
                        ref={dialog}
                        className="modal p-0 rounded-xl shadow-2xl max-w-lg w-full bg-white dark:bg-gray-900 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-blue-700 text-white p-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                {video ? "Update" : "Upload"} Video
                            </h2>
                            <button
                                onClick={() => dialog.current?.close()}
                                className="hover:text-red-300 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleVideo)} className="p-6 space-y-5">
                            {/* Video Upload */}
                            {!video && (
                                <div className="border-2 border-dashed p-6 text-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <div className="bg-blue-200 dark:bg-blue-900 rounded-full p-4 inline-block mb-4">
                                        <FileVideo className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                        Select Video to Upload
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        MP4 files only, max 1GB
                                    </p>
                                    <input
                                        type="file"
                                        {...register("videoFile", {
                                            required: !video,
                                            validate: (file) =>
                                                file?.[0]
                                                    ? ["video/mp4"].includes(file[0].type) || "Only MP4 files allowed"
                                                    : "Video is required",
                                        })}
                                        className="hidden"
                                        id="videoUpload"
                                        accept=".mp4"
                                    />
                                    <label
                                        htmlFor="videoUpload"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
                                    >
                                        Choose File
                                    </label>
                                    {errors.videoFile && (
                                        <p className="text-red-500 mt-2">{errors.videoFile.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-900 dark:text-white flex items-center">
                                    <Image className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    Thumbnail {!video && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <input
                                    type="file"
                                    {...register("thumbnail", {
                                        required: !video,
                                        validate: (file) =>
                                            video ||
                                            (file?.[0] &&
                                                ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type)) ||
                                            "Only JPEG and PNG files are allowed",
                                    })}
                                    className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    accept=".jpg,.jpeg,.png"
                                />
                                {errors.thumbnail && (
                                    <p className="text-red-500 mt-2">{errors.thumbnail.message}</p>
                                )}
                            </div>

                            {/* Title Input */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="Enter video title"
                                    className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                                {errors.title && (
                                    <p className="text-red-500 mt-2">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    placeholder="Add video description"
                                    className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        dialog.current?.close();
                                    }}
                                    className="border p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
                                    disabled={Object.keys(errors).length > 0}
                                >
                                    {video ? "Update" : "Publish"}
                                </button>
                            </div>
                        </form>
                    </dialog>,
                    document.getElementById("popup-models")
                )}
        </div>
    );
}

export default React.forwardRef(VideoForm);
