import React, { useRef, useState, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import getTimeDistanceToNow from "../../utils/getTimeDistance";
import axiosInstance from "../../utils/axios.helper";
import Button from "../Button";
import LoginPopup from "../Auth/LoginPopup";
import { getUserTweets } from "../../hooks/getUserTweets";
import { removeUserTweets } from "../../store/userSlice";
import { deleteTweet, updateTweet, toggleLike } from "../../store/tweetsSlice";

function Tweet({ tweet, page = false }) {
    const { status, userData } = useSelector((state) => state.auth);
    const [update, setUpdate] = useState(false);
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch();
    const LoginLikePopupDialog = useRef();
    const ref = useRef(null);
    const location = useLocation();
    const { register, handleSubmit, setValue } = useForm();

    const handleTweetDelete = async () => {
        try {
            await axiosInstance.delete(`/tweets/${tweet._id}`).then(() => {
                if (page) {
                    dispatch(deleteTweet(tweet._id));
                } else {
                    dispatch(removeUserTweets());
                    getUserTweets(dispatch, userData._id);
                }
            });
        } catch (error) {
            toast.error("Couldn't delete tweet. Try again!");
        }
    };

    const handleTweetUpdate = async (data) => {
        try {
            await axiosInstance.patch(`/tweets/${tweet._id}`, { content: data.newContent }).then((res) => {
                if (page) {
                    dispatch(updateTweet(res.data.data));
                } else {
                    dispatch(removeUserTweets());
                    getUserTweets(dispatch, userData._id);
                }
            });
            setUpdate(false);
        } catch (error) {
            toast.error("Couldn't update tweet. Try again!");
        }
    };

    const toggleTweetLike = async () => {
        if (!status) {
            LoginLikePopupDialog.current.open();
        } else {
            try {
                await axiosInstance.post(`/likes/toggle/t/${tweet._id}`).then(() => {
                    if (page) {
                        dispatch(toggleLike({
                            tweetId: tweet._id,
                            isLiked: !tweet?.isLiked,
                            likesCount: tweet?.isLiked ? tweet.likesCount - 1 : tweet.likesCount + 1,
                        }));
                    } else {
                        getUserTweets(dispatch, userData._id);
                    }
                });
            } catch (error) {
                toast.error("Error while toggling like button");
            }
        }
    };

    const handleUpdate = () => {
        setUpdate(true);
        setValue("newContent", tweet.content);
        setMenu(false);
    };

    const cancelEditing = () => {
        setUpdate(false);
    };

    const handleDelete = () => {
        handleTweetDelete();
        setMenu(false);
    };

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

    return (
        <li className="relative p-5 mb-5 bg-white/10 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Profile & Header */}
            <div className="flex items-start">
                {/* Profile Image */}
                <Link to={userData?._id === tweet?.owner?._id ? "" : "/channel/" + tweet.owner.username} className="relative w-12 h-12">
                    <img src={tweet.owner.avatar} alt="user" className="w-full h-full rounded-full object-cover border-2 border-gray-500 hover:border-green-400 transition-all duration-300" />
                </Link>

                {/* Tweet Content */}
                <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-white font-bold">{tweet?.owner?.fullName}</p>
                            <p className="text-gray-400 text-xs">{getTimeDistanceToNow(tweet?.createdAt)}</p>
                        </div>

                        {/* Menu */}
                        {tweet?.owner?._id === userData?._id && (
                            <div ref={ref} className="relative">
                                <button onClick={() => setMenu(!menu)} className="p-2 hover:bg-gray-800/50 rounded-full transition-all duration-300">
                                    <BsThreeDotsVertical className="text-gray-400 hover:text-green-500" />
                                </button>
                                {menu && (
                                    <div className="absolute right-0 w-32 bg-gray-900 rounded-lg shadow-md border border-gray-700">
                                        <button onClick={handleUpdate} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800">Edit</button>
                                        <button onClick={handleDelete} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-800">Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tweet Content */}
                    {update ? (
                        <form onSubmit={handleSubmit(handleTweetUpdate)} className="mt-3">
                            <textarea {...register("newContent", { required: true })} className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300" rows="3" />
                            <div className="flex space-x-3 mt-2">
                                <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Update</Button>
                                <Button onClick={cancelEditing} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-2 text-gray-300 text-lg">{tweet?.content}</p>
                    )}

                    {/* Like Button */}
                    <button onClick={toggleTweetLike} className="mt-3 flex items-center text-sm text-gray-400 hover:text-green-500 transition-all duration-300">
                        <span className={`w-5 h-5 transition-all ${tweet?.isLiked ? "animate-pulse text-green-500" : ""}`}>
                            {tweet?.isLiked ? <BiSolidLike /> : <BiLike />}
                        </span>
                        <span className="ml-2">{tweet?.likesCount}</span>
                    </button>
                </div>
            </div>

            <LoginPopup ref={LoginLikePopupDialog} message="Login to like this Tweet..." route={location.pathname} />
        </li>
    );
}

export default Tweet;
