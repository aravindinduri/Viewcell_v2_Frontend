import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { icons } from "../../assets/Icons";
import formatDate from "../../utils/formatDate";
import axiosInstance from "../../utils/axios.helper";
import { MdEmail } from "react-icons/md";
import { IoGlobe, IoEye } from "react-icons/io5";
import { BsPlayFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { GoInfo } from "react-icons/go";

function AboutChannel() {
    const { username } = useParams();
    const user = useSelector((state) => state.user.user);
    const [aboutChannel, setAboutChannel] = useState({
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        totalTweets: 0,
    });
    const [loading, setLoading] = useState(true);

    const getAboutChannel = async () => {
        try {
            const response = await axiosInstance.get(`/dashboard/stats/${user._id}`);
            if (response?.data?.success) {
                setAboutChannel({
                    totalVideos: response.data.data.totalVideos || 0,
                    totalViews: response.data.data.totalViews || 0,
                    totalLikes: response.data.data.totalLikes || 0,
                    totalTweets: response.data.data.totalTweets || 0,
                });
            }
        } catch (error) {
            console.log("Error fetching channel details", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAboutChannel();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {icons.bigLoading}
            </div>
        );
    }

    return (
        <div className="bg-black-100 min-h-screen flex justify-center items-center px-4 sm:px-6">
            <div className="bg-opacity-60 bg-gray-800 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-lg">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">@{username}</h2>
                    <p className="text-gray-300 mt-2 text-sm sm:text-base">
                        {user.description || "No description available."}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <InfoRow 
                        icon={<MdEmail className="w-6 h-6 text-blue-400" />} 
                        text={
                            user.email ? (
                                <a 
                                    href={`mailto:${user.email}`} 
                                    className="text-blue-400 hover:text-blue-300 transition block truncate sm:whitespace-normal"
                                    title={user.email}
                                >
                                    <span className="hidden sm:inline">{user.email}</span>
                                    <span className="sm:hidden">{user.email.length > 20 ? user.email.slice(0, 20) + "..." : user.email}</span>
                                </a>
                            ) : (
                                "No email provided"
                            )
                        }
                    />
                    <InfoRow 
                        icon={<IoGlobe className="w-6 h-6 text-green-400" />} 
                        text={
                            <a 
                                href={`/channel/${username}`} 
                                className="text-green-400 hover:text-green-300 transition block truncate sm:w-auto sm:whitespace-normal"
                                title={`https://viewcell.com/channel/${username}`}
                            >
                                <span className="hidden sm:inline">{`https://viewcell.com/channel/${username}`}</span>
                                <span className="sm:hidden">viewcell.com/...</span>
                            </a>
                        } 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <StatCard icon={<BsPlayFill className="w-7 sm:w-8 h-7 sm:h-8 text-red-400" />} value={aboutChannel.totalVideos} label="Videos" />
                    <StatCard icon={<IoEye className="w-7 sm:w-8 h-7 sm:h-8 text-yellow-400" />} value={aboutChannel.totalViews} label="Views" />
                    <StatCard icon={<BiSolidLike className="w-7 sm:w-8 h-7 sm:h-8 text-pink-400" />} value={aboutChannel.totalLikes} label="Likes" />
                    <StatCard icon={<AiFillMessage className="w-7 sm:w-8 h-7 sm:h-8 text-purple-400" />} value={aboutChannel.totalTweets} label="Tweets" />
                </div>

                <div className="mt-8 text-center">
                    <InfoRow 
                        icon={<GoInfo className="w-6 h-6 text-gray-400" />} 
                        text={`Joined on ${formatDate(user.createdAt)}`} 
                    />
                </div>
            </div>
        </div>
    );
}

const InfoRow = ({ icon, text }) => (
    <div className="flex items-center gap-3 bg-gray-700 bg-opacity-50 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
        {icon}
        <p className="text-gray-200">{text}</p>
    </div>
);

const StatCard = ({ icon, value, label }) => (
    <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 p-3 sm:p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
        {icon}
        <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{value}</h3>
        <p className="text-gray-300 text-xs sm:text-sm">{label}</p>
    </div>
);

export default AboutChannel;
