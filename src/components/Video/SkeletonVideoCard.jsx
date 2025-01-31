import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonVideoCard() {
    return (
        <div className="w-full">
            <Skeleton height={180} className="rounded-lg" />
            <div className="flex mt-2 gap-2">
                <Skeleton circle width={40} height={40} />
                <div className="flex flex-col w-full">
                    <Skeleton width="80%" height={16} />
                    <Skeleton width="60%" height={14} />
                </div>
            </div>
        </div>
    );
}

export default SkeletonVideoCard;
