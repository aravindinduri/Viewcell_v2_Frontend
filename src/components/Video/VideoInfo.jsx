import React, { useEffect, useRef, useState } from "react";
import getTimeDistanceToNow from "../../utils/getTimeDistance";
import { useLocation, Link } from "react-router-dom";
import {
    BiLike,
    BiSolidLike,
    BiSave,
    BiBell,
    BiChevronDown,
    BiChevronUp,
    BiCheckCircle,
} from "react-icons/bi";
import { MdPlaylistAdd, MdOutlinePlaylistAddCheck } from "react-icons/md";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { setVideo } from "../../store/videoSlice";
import LoginPopup from "../Auth/LoginPopup";
import axiosInstance from "../../utils/axios.helper";
import { toast } from "react-toastify";
import formatSubscription from "../../utils/fromatSubscription";
import { setPlaylists, updatePlaylist } from "../../store/playlistsSlice";
import PlaylistForm from "../Playlist/PlaylistForm";

function VideoInfo({ video }) {
    const timeDistance = getTimeDistanceToNow(video?.createdAt);
    const authStatus = useSelector((state) => state.auth.status);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [menu, setMenu] = useState(false);
    const LoginLikePopupDialog = useRef();
    const LoginSubsPopupDialog = useRef();
    const LoginSavePopupDialog = useRef();
    const ref = useRef(null);
    const dialog = useRef();
    const location = useLocation();
    const dispatch = useDispatch();
    const userPlaylist = useSelector((state) => state.user.userPlaylist);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const toggleVideoLike = async () => {
        if (!authStatus) {
            LoginLikePopupDialog.current.open();
        } else {
            try {
                const response = await axiosInstance.post(
                    `/likes/toggle/v/${video._id}`
                );
                if (response.data.success) {
                    dispatch(
                        setVideo({
                            ...video,
                            isLiked: !video.isLiked,
                            likesCount: video.isLiked
                                ? video.likesCount - 1
                                : video.likesCount + 1,
                        })
                    );
                }
            } catch (error) {
                toast.error("Error while toggling like button");
                console.log(error);
            }
        }
    };

    const toggleSubscribe = async () => {
        if (!authStatus) {
            LoginSubsPopupDialog.current.open();
        } else {
            try {
                const response = await axiosInstance.post(
                    `/subscriptions/c/${video.owner._id}`
                );
                if (response.data.success) {
                    dispatch(
                        setVideo({
                            ...video,
                            owner: {
                                ...video.owner,
                                isSubscribed: !video.owner.isSubscribed,
                                subscriberCount: video.owner.isSubscribed
                                    ? video.owner.subscriberCount - 1
                                    : video.owner.subscriberCount + 1,
                            },
                        })
                    );
                }
            } catch (error) {
                if (error.status === 403) {
                    toast.error("Cannot subscribe to your own channel");
                } else {
                    toast.error("Error while toggling subscribe button");
                    console.log(error);
                }
            }
        }
    };

    const handleSavePlaylist = async () => {
        try {
            const response = await axiosInstance.get(
                `/playlist/user/p/${video._id}`
            );
            if (response.data.success) {
                dispatch(setPlaylists(response.data.data));
            }
        } catch (error) {
            toast.error("Error while fetching your playlists");
            console.log("Error while fetching playlists", error);
        }
    };

    useEffect(() => {
        if (authStatus) {
            handleSavePlaylist();
        }
    }, [authStatus, userPlaylist]);

    const handlePlaylistVideo = async (playlistId, status) => {
        if (!playlistId && !status) return;
        if (status) {
            try {
                const response = await axiosInstance.patch(
                    `/playlist/add/${video._id}/${playlistId}`
                );
                if (response?.data?.success) {
                    toast.success(response.data.message);
                    dispatch(
                        updatePlaylist({
                            playlistId: playlistId,
                            isVideoPresent: true,
                        })
                    );
                }
            } catch (error) {
                toast.error("Error while adding video to playlist");
                console.log(error);
            }
        } else {
            try {
                const response = await axiosInstance.patch(
                    `/playlist/remove/${video._id}/${playlistId}`
                );
                if (response?.data?.success) {
                    toast.success(response.data.message);
                    dispatch(
                        updatePlaylist({
                            playlistId: playlistId,
                            isVideoPresent: false,
                        })
                    );
                }
            } catch (error) {
                toast.error("Error while removing video to playlist");
                console.log(error);
            }
        }
    };

    function popupPlaylistForm() {
        dialog.current?.open();
        setMenu(false);
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const playlists = useSelector((state) => state.playlists.playlists);

    return (
        <div className="border border-gray-700 rounded-xl px-6 py-4 mt-4 bg-blaxk-700 backdrop-blur-md">
            <div className="flex justify-between items-start">
                <div className="w-[80%]">
                    <h1 className="text-2xl font-bold text-white">
                        {video?.title}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">{`${video?.views} views • ${timeDistance}`}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <LoginPopup
                        ref={LoginLikePopupDialog}
                        message="Login to Like this Video..."
                        route={location.pathname}
                    />
                    <button
                        onClick={toggleVideoLike}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                            video.isLiked
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-800 hover:bg-gray-700"
                        } transition-all duration-300`}
                    >
                        {video.isLiked ? (
                            <HiThumbUp className="w-5 h-5 text-white" />
                        ) : (
                            <HiOutlineThumbUp className="w-5 h-5 text-white" />
                        )}
                        <span className="ml-2 text-white">
                            {video?.likesCount}
                        </span>
                    </button>

                    <LoginPopup
                        ref={LoginSavePopupDialog}
                        message="Login to add this video in playlist..."
                        route={location.pathname}
                    />
                    <div ref={ref} className="relative">
                        <Button
                            onClick={() => {
                                if (authStatus) {
                                    setMenu((prev) => !prev);
                                } else {
                                    LoginSavePopupDialog.current.open();
                                }
                            }}
                            className="flex items-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                        >
                            <BiSave className="w-5 h-5 text-white" />
                            <span className="ml-2 text-white">Save</span>
                        </Button>
                        {menu && (
                            <div className="absolute right-0 top-full z-10 w-64 mt-2 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg p-4">
                                <h3 className="mb-4 text-center text-lg font-semibold text-white">
                                    Save to playlist
                                </h3>
                                <ul className="mb-4">
                                    {playlists?.length > 0 ? (
                                        playlists?.map((item) => (
                                            <li
                                                key={item._id}
                                                className="mb-2 last:mb-0 text-sm text-white"
                                            >
                                                <label
                                                    htmlFor={
                                                        "collection" + item._id
                                                    }
                                                    className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={"collection" + item._id}
                                                        defaultChecked={
                                                            item.isVideoPresent
                                                        }
                                                        onChange={(e) =>
                                                            handlePlaylistVideo(
                                                                item._id,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    {item.name}
                                                </label>
                                            </li>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            No playlist created.
                                        </div>
                                    )}
                                </ul>
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={popupPlaylistForm}
                                        className="flex items-center gap-x-2 bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 text-white font-semibold transition-all duration-300"
                                    >
                                        <MdPlaylistAdd className="w-5 h-5" />
                                        Create new Playlist
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                    <Link to={`/channel/${video?.owner?.username}`}>
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={video?.owner?.avatar}
                            alt={video?.owner?.fullName}
                        />
                    </Link>
                    <div className="ml-3">
                        <p className="text-white font-semibold">
                            {video?.owner?.fullName}
                        </p>
                        <p className="text-sm text-gray-400">
                            {formatSubscription(video?.owner?.subscriberCount)}
                        </p>
                    </div>
                </div>
                <LoginPopup
                    ref={LoginSubsPopupDialog}
                    message="Login to Subscribe..."
                    route={location.pathname}
                />
                <Button
                    onClick={toggleSubscribe}
                    className={`flex items-center px-4 py-2 rounded-full ${
                        video.owner.isSubscribed
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-800 hover:bg-gray-700"
                    } transition-all duration-300`}
                >
                    {video.owner.isSubscribed ? (
                        <>
                            <IoIosNotifications className="w-5 h-5 text-white" />
                            <span className="ml-2 text-white">Subscribed</span>
                        </>
                    ) : (
                        <>
                            <IoIosNotificationsOutline className="w-5 h-5 text-white" />
                            <span className="ml-2 text-white">Subscribe</span>
                        </>
                    )}
                </Button>
            </div>

            <div className="mt-6 border-t border-black pt-4">
                <p
                    className={`text-gray-300 ${
                        showFullDescription ? "" : "line-clamp-2"
                    }`}
                >
                    {video.description || "No description"}
                </p>
                <button
                    onClick={toggleDescription}
                    className="text-green-600 hover:text-green-700 mt-2 flex items-center transition-all duration-300"
                >
                    {showFullDescription ? (
                        <>
                            <BiChevronUp className="w-5 h-5" />
                            <span className="ml-1">Show less</span>
                        </>
                    ) : (
                        <>
                            <BiChevronDown className="w-5 h-5" />
                            <span className="ml-1">Show more</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default VideoInfo;