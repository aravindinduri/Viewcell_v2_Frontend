import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPlayOutline, IoAdd } from "react-icons/io5";

function ChannelEmptyVideo() {
    const { status, userData } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center p-6 bg-gray-900">
            <div className="w-full max-w-lg text-center mt-8 bg-gray-800 p-6 rounded-xl shadow-2xl">
                <p className="mb-4">
                    <span className="inline-flex rounded-full bg-green-600 p-4">
                        <IoPlayOutline className="w-12 h-12 text-white" />
                    </span>
                </p>
                <h5 className="text-2xl font-semibold mb-3 text-white">
                    No videos uploaded
                </h5>
                <p className="text-sm text-gray-400 mb-6">
                    {status && user.username === userData.username ? (
                        <>
                            You have yet to upload a video. Click the button to
                            upload a new video.
                        </>
                    ) : (
                        <>
                            This page has yet to upload a video. You can search
                            other pages to find more videos.
                        </>
                    )}
                </p>
                {status && user.username === userData.username ? (
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="inline-flex items-center gap-x-3 bg-green-600 hover:bg-green-700 border border-transparent rounded-lg px-6 py-2 font-semibold text-white transition-all"
                    >
                        <IoAdd className="w-5 h-5" />
                        New Video
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default ChannelEmptyVideo;
