import React from "react";
import { Link } from "react-router-dom";
import formatDuration from "../../utils/formatDuration.js";
import getTimeDistanceToNow from "../../utils/getTimeDistance.js";

const VideoCard = React.memo(({ video }) => {
    const formattedDuration = formatDuration(parseInt(video?.duration));
    const timeDistance = getTimeDistanceToNow(video?.createdAt);

    return (
        <Link to={`/watchpage/${video?._id}`}>
            <div className="bg-black-800 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                <div className="relative aspect-video">
                    <img
                        className="w-full h-full object-cover"
                        src={video?.thumbnail}
                        alt={video?.title}
                    />
                    <p className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-md text-sm">
                        {formattedDuration}
                    </p>
                </div>

                {/* Video Details */}
                <div className="p-3">
                    <h1 className="font-semibold text-lg line-clamp-2">
                        {video?.title}
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {`${video?.views} views • ${timeDistance}`}
                    </p>
                    <div className="flex items-center mt-2">
                        <img
                            className="w-8 h-8 rounded-full object-cover mr-2"
                            src={video?.owner?.avatar}
                            alt={video?.owner?.fullName}
                        />
                        <p className="text-gray-300 text-sm">
                            {video?.owner?.fullName}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default VideoCard;