import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/Video/VideoPlayer";
import axiosInstance from "../utils/axios.helper.js";
import { useSelector, useDispatch } from "react-redux";
import { setVideo } from "../store/videoSlice.js";
import { useParams } from "react-router-dom";
import VideoListCard from "../components/Video/VideoListCard.jsx";
import VideoInfo from "../components/Video/VideoInfo.jsx";
import Comments from "../components/Comments.jsx";
import GuestComponent from "../components/GuestPages/GuestComponent.jsx";
import { IoPlayCircleOutline } from "react-icons/io5";
import { icons } from "../assets/Icons.jsx";

function Video() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { videoId } = useParams();
    const [videos, setVideos] = useState([]);
    const { video } = useSelector((state) => state.video);
    const authStatus = useSelector((state) => state.auth.status);

    const fetchVideo = async () => {
        setError("");
        try {
            const response = await axiosInstance.get(`/videos/${videoId}`);
            if (response?.data?.data) {
                dispatch(setVideo(response.data.data));
            }
        } catch (error) {
            setError(
                <GuestComponent
                    title="Video does not exist"
                    subtitle="There is no video present for given videoId. It may have been moved or deleted."
                    icon={
                        <span className="w-full h-full flex items-center p-4">
                            <IoPlayCircleOutline className="w-28 h-28" />
                        </span>
                    }
                    guest={false}
                />
            );
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVideos = async () => {
        try {
            const response = await axiosInstance.get(
                `/videos?sortBy=views&limit=8`
            );
            if (response?.data?.data?.length > 0) {
                setVideos(response.data.data);
            }
        } catch (error) {
            console.log("Error fetching videos", error);
        }
    };

    useEffect(() => {
        fetchVideo();
        fetchVideos();
    }, [videoId, authStatus]);

    if (error) {
        return error;
    }

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center mt-20">
                    {icons.bigLoading}
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Video Player and Info */}
                    <div className="flex-grow lg:w-[70%]">
                        <div className="aspect-w-16 aspect-h-9">
                            <VideoPlayer
                                key={video._id}
                                videoFile={video.videoFile}
                            />
                        </div>
                        <div className="mt-4">
                            <VideoInfo video={video} />
                        </div>
                        <div className="mt-6">
                            <Comments video={video} />
                        </div>
                    </div>

                    {/* Related Videos */}
                    <div className="lg:w-[30%]">
                        <h2 className="text-xl font-semibold mb-4">
                            Related Videos
                        </h2>
                        <div className="space-y-4 overflow-y-auto max-h-[80vh]">
                            {videos
                                ?.filter((video) => video?._id !== videoId)
                                .map((video) => (
                                    <VideoListCard
                                        key={video?._id}
                                        video={video}
                                        imgWidth="w-full"
                                        imgHeight="h-[150px]"
                                        titleWidth="w-full"
                                        titleSize="text-base"
                                        titleFont="font-medium"
                                        showVideoDescription={false}
                                        paddingY="py-2"
                                        marginLeft="ml-0"
                                        marginLeft2="ml-2"
                                        avatarHeight="h-8"
                                        avatarWidth="w-8"
                                        textFont="text-sm"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Video;