import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Film, Loader2 } from 'lucide-react';

function UploadingVideo({ video, updating = false }, ref) {
    const dialog = useRef();
    const confirmCancelDialog = useRef();

    useImperativeHandle(
        ref,
        () => ({
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        }),
        []
    );

    return createPortal(
        <dialog
            ref={dialog}
            className="w-full max-w-md mx-auto my-auto rounded-xl shadow-2xl bg-white dark:bg-zinc-900 text-gray-800 dark:text-white overflow-hidden"
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {updating ? "Updating" : "Uploading"} Video
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
                            Track your video {updating ? "update" : "upload"} progress
                        </p>
                    </h2>
                    <button
                        onClick={() => dialog.current.close()}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="bg-blue-50 dark:bg-zinc-800 rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-zinc-700 p-3 rounded-full">
                        <Film className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-grow">
                        <h6 className="font-semibold text-gray-800 dark:text-white">
                            {updating 
                                ? `Updating ${video.title}` 
                                : video?.videoFile?.[0]?.name || "Video File"}
                        </h6>
                        {!updating && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {video?.videoFile?.[0] 
                                    ? `${(video.videoFile[0].size / 1000000).toFixed(2)} MB` 
                                    : "No file selected"}
                            </p>
                        )}
                        <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400">
                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                            {updating ? "Updating" : "Uploading"}
                        </div>
                    </div>
                </div>

                {!updating && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => dialog.current.close()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </dialog>,
        document.getElementById("popup-models")
    );
}

export default React.forwardRef(UploadingVideo);