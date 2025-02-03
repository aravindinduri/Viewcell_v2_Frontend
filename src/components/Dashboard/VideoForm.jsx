import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { BsUpload } from "react-icons/bs";
import axiosInstance from "../../utils/axios.helper.js";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import UploadSuccess from "./UploadSuccess.jsx";
import UploadingVideo from "./UploadingVideo.jsx";
import { addVideoStats } from "../../store/dashboardSlice.js";
import { useDispatch } from "react-redux";
import { getChannelVideos } from "../../hooks/getChannelVideos.js";

function VideoForm({ video = false }, ref) {
    const dialog = useRef();
    const uploadingDialog = useRef();
    const successDialog = useRef();
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
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
                dialog.current?.showModal();
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

    const publishVideo = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("videoFile", data.videoFile[0]);

        try {
            await axiosInstance.post("/videos", formData).then(() => {
                uploadingDialog.current.close();
                successDialog.current.open();
                reset();
                dispatch(addVideoStats());
                getChannelVideos(dispatch);
                toast.success("Video uploaded successfully");
            });
        } catch (error) {
            uploadingDialog.current.close();
            toast.error("Error while uploading video. Try again!!");
            console.log("Error uploading video", error);
        }
    };

    const updateVideo = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);

        try {
            await axiosInstance
                .patch(`/videos/${video._id}`, formData)
                .then(() => {
                    uploadingDialog.current.close();
                    successDialog.current.open();
                    reset();
                    getChannelVideos(dispatch);
                });
        } catch (error) {
            uploadingDialog.current.close();
            toast.error("Error while updating video. Try again!!");
            console.log("Error updating video", error);
        }
    };


    const handleVideo = (data) => {
        if (video) {
            updateVideo(data);
        } else {
            publishVideo(data);
        }
        dialog.current.close();
        uploadingDialog.current.open();
    };

    return (
        <div>
            {showPopup &&
                createPortal(
                    <dialog
                        ref={dialog}
                        className="backdrop:backdrop-blur-md max-w-xl w-full sm:w-[90%] lg:w-[40%] rounded-lg shadow-2xl"
                    >
                        <UploadingVideo ref={uploadingDialog} video={video || getValues()} updating={!!video} />
                        <UploadSuccess ref={successDialog} video={video || getValues()} updating={!!video} />

                        <div className="bg-gray-900 p-6 text-white rounded-lg">
                            <form
                                onSubmit={handleSubmit(handleVideo)}
                                className="bg-gray-800 rounded-md shadow-lg p-5"
                            >
                                <div className="flex items-center justify-between border-b pb-3">
                                    <h2 className="text-2xl font-semibold text-blue-400">
                                        {video ? "Update" : "Upload"} Video
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => dialog.current.close()}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <IoClose size={24} />
                                    </button>
                                </div>

                                {!video && (
                                    <div className="border-2 border-dashed border-blue-500 p-5 text-center mt-5 rounded-md">
                                        <BsUpload size={40} className="mx-auto text-blue-400" />
                                        <h6 className="font-semibold text-lg mt-2">Select Video to Upload</h6>
                                        <p className="text-gray-400 text-sm">Your video will be published by default.</p>
                                        <label htmlFor="upload-video" className="block mt-4 cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-500">
                                            <input type="file" id="upload-video" className="sr-only" {...register("videoFile", { required: true })} />
                                            Select File
                                        </label>
                                        {errors.videoFile && <p className="text-red-400 mt-2 text-sm">Video file is required</p>}
                                    </div>
                                )}

                                <div className="mt-5">
                                    <label htmlFor="thumbnail" className="block text-lg font-medium">
                                        Thumbnail {video ? "" : <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="file"
                                        id="thumbnail"
                                        className="w-full border p-2 rounded-md bg-gray-700 text-white"
                                        {...register("thumbnail", { required: !video })}
                                    />
                                    {errors.thumbnail && <p className="text-red-400 mt-1 text-sm">Thumbnail is required</p>}
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="title" className="block text-lg font-medium">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full border p-2 rounded-md bg-gray-700 text-white"
                                        placeholder="Enter video title"
                                        {...register("title", { required: true })}
                                    />
                                    {errors.title && <p className="text-red-400 mt-1 text-sm">Title is required</p>}
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="desc" className="block text-lg font-medium">Description</label>
                                    <textarea
                                        id="desc"
                                        className="w-full h-24 border p-2 rounded-md bg-gray-700 text-white"
                                        placeholder="Write a brief description"
                                        {...register("description")}
                                    ></textarea>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button type="button" onClick={() => dialog.current.close()} className="px-4 py-2 border rounded-md text-gray-300 hover:bg-gray-700">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md font-semibold">
                                        {video ? "Update" : "Publish"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>,
                    document.getElementById("popup-models")
                )}
        </div>
    );
}

export default React.forwardRef(VideoForm);
