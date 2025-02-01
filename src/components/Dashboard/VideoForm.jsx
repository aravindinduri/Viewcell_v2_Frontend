// import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { X, Upload, Image, FileVideo } from "lucide-react";
// import { toast } from "react-toastify";
// import { createPortal } from "react-dom";

// function VideoForm({ video = false }, ref) {
//     const dialog = useRef();
//     const [showPopup, setShowPopup] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm({
//         defaultValues: {
//             title: video?.title || "",
//             description: video?.description || "",
//         },
//     });

//     useImperativeHandle(
//         ref,
//         () => ({
//             open() {
//                 setShowPopup(true);
//             },
//             close() {
//                 dialog.current?.close();
//             },
//         }),
//         []
//     );

//     useEffect(() => {
//         if (showPopup) {
//             dialog.current?.showModal();
//         }
//     }, [showPopup]);

//     const handleVideo = async (data) => {
//         try {
//             toast.success(video ? "Video updated" : "Video uploaded");
//             dialog.current?.close();
//         } catch (error) {
//             toast.error("Upload failed");
//         }
//     };

//     return (
//         <div>
//             {showPopup &&
//                 createPortal(
//                     <dialog
//                         ref={dialog}
//                         className="modal p-0 rounded-xl shadow-2xl max-w-lg w-full bg-white dark:bg-gray-900 overflow-hidden"
//                     >
//                         <div className="bg-blue-700 text-white p-5 flex justify-between items-center">
//                             <h2 className="text-xl font-semibold">
//                                 {video ? "Update" : "Upload"} Video
//                             </h2>
//                             <button
//                                 onClick={() => dialog.current?.close()}
//                                 className="hover:text-red-300 transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit(handleVideo)} className="p-6 space-y-5">
//                             {!video && (
//                                 <div className="border-2 border-dashed p-6 text-center rounded-lg bg-gray-100 dark:bg-gray-800">
//                                     <div className="bg-blue-200 dark:bg-blue-900 rounded-full p-4 inline-block mb-4">
//                                         <FileVideo className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//                                     </div>
//                                     <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
//                                         Select Video to Upload
//                                     </h3>
//                                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                                         MP4 files only, max 1GB
//                                     </p>
//                                     <input
//                                         type="file"
//                                         {...register("videoFile", {
//                                             required: !video,
//                                             validate: (file) =>
//                                                 file?.[0]
//                                                     ? ["video/mp4"].includes(file[0].type) || "Only MP4 files allowed"
//                                                     : "Video is required",
//                                         })}
//                                         className="hidden"
//                                         id="videoUpload"
//                                         accept=".mp4"
//                                     />
//                                     <label
//                                         htmlFor="videoUpload"
//                                         className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
//                                     >
//                                         Choose File
//                                     </label>
//                                     {errors.videoFile && (
//                                         <p className="text-red-500 mt-2">{errors.videoFile.message}</p>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Thumbnail Upload */}
//                             <div>
//                                 <label className="block mb-2 font-medium text-gray-900 dark:text-white flex items-center">
//                                     <Image className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-400" />
//                                     Thumbnail {!video && <span className="text-red-500 ml-1">*</span>}
//                                 </label>
//                                 <input
//                                     type="file"
//                                     {...register("thumbnail", {
//                                         required: !video,
//                                         validate: (file) =>
//                                             video ||
//                                             (file?.[0] &&
//                                                 ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type)) ||
//                                             "Only JPEG and PNG files are allowed",
//                                     })}
//                                     className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                                     accept=".jpg,.jpeg,.png"
//                                 />
//                                 {errors.thumbnail && (
//                                     <p className="text-red-500 mt-2">{errors.thumbnail.message}</p>
//                                 )}
//                             </div>

//                             {/* Title Input */}
//                             <div>
//                                 <label className="block mb-2 font-medium text-gray-900 dark:text-white">
//                                     Title <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     {...register("title", { required: "Title is required" })}
//                                     placeholder="Enter video title"
//                                     className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                                 />
//                                 {errors.title && (
//                                     <p className="text-red-500 mt-2">{errors.title.message}</p>
//                                 )}
//                             </div>

//                             {/* Description Input */}
//                             <div>
//                                 <label className="block mb-2 font-medium text-gray-900 dark:text-white">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     {...register("description")}
//                                     placeholder="Add video description"
//                                     className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24"
//                                 />
//                             </div>

//                             {/* Buttons */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         reset();
//                                         dialog.current?.close();
//                                     }}
//                                     className="border p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
//                                     disabled={Object.keys(errors).length > 0}
//                                 >
//                                     {video ? "Update" : "Publish"}
//                                 </button>
//                             </div>
//                         </form>
//                     </dialog>,
//                     document.getElementById("popup-models")
//                 )}
//         </div>
//     );
// }

// export default React.forwardRef(VideoForm);

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
        () => {
            return {
                open() {
                    setShowPopup(true);
                    dialog.current?.showModal();
                },
                close() {
                    dialog.current.close();
                },
            };
        },
        []
    );

    useEffect(() => {
        if (showPopup) {
            dialog.current.showModal();
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

    const handleVideo = async (data) => {
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
                        className="h-fit backdrop:backdrop-blur-lg lg:w-[40%] md:w-2/3 items-center"
                    >
                        <UploadingVideo
                            ref={uploadingDialog}
                            video={video || getValues()}
                            updating={video ? true : false}
                        />
                        <UploadSuccess
                            ref={successDialog}
                            video={video || getValues()}
                            updating={video ? true : false}
                        />
                        <div className="bg-black/85 p-2 text-white">
                            <form
                                onSubmit={handleSubmit(handleVideo)}
                                className="h-fit border bg-zinc-950"
                            >
                                <div className="flex items-center justify-between border-b px-2 py-1 md:p-3">
                                    <h2 className="text-xl font-semibold">
                                        {video ? "Update" : "Upload"} Video
                                    </h2>
                                    <button
                                        type="button"
                                        title="Close"
                                        autoFocus
                                        onClick={() => dialog.current.close()}
                                        className="h-6 w-6 hover:text-red-600"
                                    >
                                        <IoClose className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-2 md:gap-y-3 p-4">
                                    {!video && (
                                        <>
                                            <div className="w-full border-2 border-dotted px-2 py-5 text-center">
                                                <span className="mb-2 inline-block rounded-full bg-[#f8c3fa] p-3 text-pink-500">
                                                    <BsUpload className="h-7 w-7" />
                                                </span>
                                                <h6 className="mb-1 font-semibold text-sm md:text-lg">
                                                    Select video file to upload
                                                </h6>
                                                <p className="text-gray-400 text-sm">
                                                    Your video will be publised
                                                    by default after upload is
                                                    complete.
                                                </p>
                                                <label
                                                    htmlFor="upload-video"
                                                    className="mt-3 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-pink-500 px-3 py-2 text-sm text-center font-semibold text-black transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px]"
                                                >
                                                    <input
                                                        type="file"
                                                        id="upload-video"
                                                        className="sr-only"
                                                        {...register(
                                                            "videoFile",
                                                            {
                                                                required: true,
                                                                validate: (
                                                                    file
                                                                ) => {
                                                                    const allowedExtensions =
                                                                        [
                                                                            "video/mp4",
                                                                        ];
                                                                    const fileType =
                                                                        file[0]
                                                                            .type;
                                                                    return allowedExtensions.includes(
                                                                        fileType
                                                                    )
                                                                        ? true
                                                                        : "Invalid file type! Only .mp4 files are accepted";
                                                                },
                                                            }
                                                        )}
                                                    />
                                                    Select File
                                                </label>
                                            </div>
                                            {errors.videoFile?.type ===
                                                "required" && (
                                                <div className="text-red-500">
                                                    VideoFile is required
                                                </div>
                                            )}
                                            {errors.videoFile?.type ===
                                                "validate" && (
                                                <div className="text-red-500">
                                                    {errors.videoFile.message}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="w-full">
                                        <label
                                            htmlFor="thumbnail"
                                            className="mb-1 inline-block"
                                        >
                                            Thumbnail
                                            {!video && (
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            id="thumbnail"
                                            className="w-full border p-1 file:mr-4 file:border-none cursor-pointer file:bg-pink-500 file:px-3 file:py-1.5"
                                            {...register("thumbnail", {
                                                required: !video,
                                                validate: (file) => {
                                                    if (video) return true;
                                                    if (!file[0]) return true;
                                                    const allowedExtensions = [
                                                        "image/jpeg",
                                                        "image/png",
                                                        "image/jpg",
                                                    ];
                                                    const fileType =
                                                        file[0]?.type;
                                                    return allowedExtensions.includes(
                                                        fileType
                                                    )
                                                        ? true
                                                        : "Invalid file type! Only .png .jpg and .jpeg files are accepted";
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.thumbnail?.type === "required" && (
                                        <div className="text-red-500">
                                            Thumbnail is required
                                        </div>
                                    )}
                                    {errors.thumbnail?.type === "validate" && (
                                        <div className="text-red-500">
                                            {errors.thumbnail.message}
                                        </div>
                                    )}

                                    <div className="w-full">
                                        <label
                                            htmlFor="title"
                                            className="mb-1 inline-block"
                                        >
                                            Title
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Add video title"
                                            id="title"
                                            className="w-full border focus:border-pink-400 bg-transparent px-2 py-1 outline-none"
                                            {...register("title", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    {errors.title?.type === "required" && (
                                        <div className="text-red-500">
                                            Title is required
                                        </div>
                                    )}

                                    <div className="w-full">
                                        <label
                                            htmlFor="desc"
                                            className="mb-1 inline-block"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Add some description"
                                            id="desc"
                                            className="h-24 md:h-32 w-full resize-none border focus:border-pink-400 bg-transparent px-2 py-1 outline-none"
                                            {...register("description")}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                reset();
                                                dialog.current.close();
                                            }}
                                            className="border px-4 py-2 hover:bg-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                errors.title ||
                                                errors.videoFile ||
                                                (!video && errors.thumbnail)
                                            }
                                            className="bg-pink-600 px-4 py-2 text-black hover:font-semibold hover:border disabled:bg-pink-700 disabled:cursor-not-allowed"
                                        >
                                            {video ? "Update" : "Publish"}
                                        </button>
                                    </div>
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