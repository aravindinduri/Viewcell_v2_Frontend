import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Image, FileVideo } from 'lucide-react';
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
        // Placeholder for video upload/update logic
        try {
            // Actual implementation would go here
            toast.success(video ? "Video updated" : "Video uploaded");
            dialog.current?.close();
        } catch (error) {
            toast.error("Upload failed");
        }
    };

    return (
        <div>
            {showPopup && createPortal(
                <dialog 
                    ref={dialog} 
                    className="modal p-0 rounded-xl shadow-2xl max-w-lg w-full bg-white dark:bg-zinc-900 overflow-hidden"
                >
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            {video ? "Update" : "Upload"} Video
                        </h2>
                        <button 
                            onClick={() => dialog.current?.close()}
                            className="hover:text-red-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form 
                        onSubmit={handleSubmit(handleVideo)}
                        className="p-6 space-y-4"
                    >
                        {!video && (
                            <div className="border-2 border-dashed p-6 text-center">
                                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                                    <FileVideo className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Select Video to Upload
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    MP4 files only, max 1GB
                                </p>
                                <input
                                    type="file"
                                    {...register("videoFile", {
                                        required: !video,
                                        validate: (file) => {
                                            if (!file?.[0]) return "Video is required";
                                            const allowedTypes = ["video/mp4"];
                                            return allowedTypes.includes(file[0].type) 
                                                || "Only MP4 files are allowed";
                                        }
                                    })}
                                    className="hidden"
                                    id="videoUpload"
                                    accept=".mp4"
                                />
                                <label 
                                    htmlFor="videoUpload"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                                >
                                    Choose File
                                </label>
                                {errors.videoFile && (
                                    <p className="text-red-500 mt-2">
                                        {errors.videoFile.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block mb-2 flex items-center">
                                <Image className="mr-2 w-5 h-5 text-blue-600" />
                                Thumbnail
                                {!video && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <input
                                type="file"
                                {...register("thumbnail", {
                                    required: !video,
                                    validate: (file) => {
                                        if (video) return true;
                                        if (!file?.[0]) return "Thumbnail is required";
                                        const allowedTypes = [
                                            "image/jpeg", 
                                            "image/png", 
                                            "image/jpg"
                                        ];
                                        return allowedTypes.includes(file[0].type)
                                            || "Only JPEG and PNG files are allowed";
                                    }
                                })}
                                className="w-full border p-2 rounded-lg"
                                accept=".jpg,.jpeg,.png"
                            />
                            {errors.thumbnail && (
                                <p className="text-red-500 mt-2">
                                    {errors.thumbnail.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Enter video title"
                                className="w-full border p-2 rounded-lg"
                            />
                            {errors.title && (
                                <p className="text-red-500 mt-2">
                                    Title is required
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2">Description</label>
                            <textarea
                                {...register("description")}
                                placeholder="Add video description"
                                className="w-full border p-2 rounded-lg h-24 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    dialog.current?.close();
                                }}
                                className="border p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
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