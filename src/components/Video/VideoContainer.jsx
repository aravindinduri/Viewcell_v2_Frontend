import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { FaVideo } from "react-icons/fa";
import axiosInstance from "../../utils/axios.helper.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { icons } from "../../assets/Icons.jsx";

function VideoContainer() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const getData = async (page) => {
        try {
            const response = await axiosInstance.get(
                `/videos?page=${page}&limit=20`
            );
            if (response?.data?.data?.length > 0) {
                setVideos((prevVideos) => [
                    ...prevVideos,
                    ...response.data.data,
                ]);
                setLoading(false);
                if (response.data.data.length !== 20) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error fetching videos", error);
        }
    };

    useEffect(() => {
        getData(page);
    }, [page]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                {icons.bigLoading}
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="flex flex-col items-center text-gray-400">
                    <FaVideo className="w-20 h-20 mb-4" />
                    <h1 className="text-xl">No Videos Available</h1>
                </div>
            </div>
        );
    }

    return (
        <InfiniteScroll
            dataLength={videos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
                <div className="flex justify-center py-4">
                    {icons.loading}
                </div>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </InfiniteScroll>
    );
}

export default VideoContainer;