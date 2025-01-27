import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { 
  Video, 
  Eye, 
  Users, 
  Heart, 
  PlusCircle 
} from 'lucide-react';
import VideoForm from "./VideoForm";

function InfoBox({ title, value, icon, bgColor = "bg-blue-100", textColor = "text-blue-600" }) {
  return (
    <div className={`${bgColor} ${textColor} p-5 rounded-xl shadow-md flex items-center space-x-4 transform transition-all duration-300 hover:scale-105`}>
      <div className="bg-white/30 p-3 rounded-full">
        {React.cloneElement(icon, { className: "w-8 h-8" })}
      </div>
      <div>
        <p className="text-sm font-medium opacity-75">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

function ChannelStats({ stats }) {
  const user = useSelector((state) => state.auth.userData);
  const uploadRef = useRef();

  return (
    <div className="space-y-6 font-['Inter']">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back, {user?.fullName}
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage your channel and video performance.
          </p>
        </div>
        <div>
          <VideoForm ref={uploadRef} />
          <button
            onClick={() => uploadRef.current?.open()}
            className="mt-4 inline-flex items-center gap-x-2 bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Upload Video
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoBox
          title="Total Videos"
          value={stats.totalVideos}
          icon={<Video />}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <InfoBox
          title="Total Views"
          value={stats.totalViews}
          icon={<Eye />}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <InfoBox
          title="Subscribers"
          value={stats.subscriberCount}
          icon={<Users />}
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />
        <InfoBox
          title="Total Likes"
          value={stats.totalLikes}
          icon={<Heart />}
          bgColor="bg-pink-100"
          textColor="text-pink-600"
        />
      </div>
    </div>
  );
}

export default ChannelStats;