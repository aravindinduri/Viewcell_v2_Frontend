import React, { useRef, useState, useEffect } from "react";
import getTimeDistanceToNow from "../../utils/getTimeDistance";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios.helper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import LoginPopup from "../Auth/LoginPopup";
import { getUserTweets } from "../../hooks/getUserTweets";
import { removeUserTweets } from "../../store/userSlice";
import { useForm } from "react-hook-form";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    deleteTweet,
    updateTweet,
    toggleLike,
} from "../../store/tweetsSlice";

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
            console.log("Error while deleting tweet", error);
        }
    };

    const handleTweetUpdate = async (data) => {
        try {
            await axiosInstance
                .patch(`/tweets/${tweet._id}`, {
                    content: data.newContent,
                })
                .then((res) => {
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
            console.log("Error while updating tweet", error);
        }
    };

    const toggleTweetLike = async () => {
        if (!status) {
            LoginLikePopupDialog.current.open();
        } else {
            try {
                await axiosInstance
                    .post(`/likes/toggle/t/${tweet._id}`)
                    .then(() => {
                        if (page) {
                            dispatch(
                                toggleLike({
                                    tweetId: tweet._id,
                                    isLiked: !tweet?.isLiked,
                                    likesCount: tweet?.isLiked
                                        ? tweet.likesCount - 1
                                        : tweet.likesCount + 1,
                                })
                            );
                        } else {
                            getUserTweets(dispatch, userData._id);
                        }
                    });
            } catch (error) {
                toast.error("Error while toggling like button");
                console.log(error);
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
        <li className="flex relative p-4 mb-4 bg-gray-900/50 backdrop-blur-md rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group">
            {/* User Avatar */}
            <div className="h-12 w-12 shrink-0">
                <Link
                    to={`${
                        userData?._id === tweet?.owner?._id
                            ? ""
                            : "/channel/" + tweet.owner.username
                    }`}
                >
                    <img
                        src={tweet.owner.avatar}
                        alt="user"
                        className="h-full w-full rounded-full object-cover border-2 border-green-500/50 hover:border-green-500 transition-all duration-300"
                    />
                </Link>
            </div>

            {/* Tweet Content */}
            <div className="px-3 justify-start flex-grow">
                <div className="flex items-center">
                    <p className="font-semibold text-white">{tweet?.owner?.fullName}</p>
                    <p className="ml-2 text-gray-400 text-sm">
                        · {getTimeDistanceToNow(tweet?.createdAt)}
                    </p>
                </div>
                {update ? (
                    <form
                        className="mt-2 flex flex-col space-y-3"
                        onSubmit={handleSubmit(handleTweetUpdate)}
                    >
                        <textarea
                            {...register("newContent", {
                                required: true,
                            })}
                            placeholder="Edit your tweet..."
                            className="w-full p-2 bg-transparent text-white border border-gray-700/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all duration-300"
                            rows="3"
                        />
                        <div className="flex space-x-3">
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                            >
                                Update
                            </Button>
                            <Button
                                onClick={cancelEditing}
                                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-gray-500/20"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-1 text-gray-300 break-words">{tweet?.content}</div>
                )}

                {/* Like Button */}
                <button
                    onClick={() => toggleTweetLike()}
                    className={`mt-2 flex items-center text-sm text-gray-400 hover:text-green-500 transition-all duration-300`}
                >
                    {tweet?.isLiked ? (
                        <BiSolidLike className="w-5 h-5 text-green-500" />
                    ) : (
                        <BiLike className="w-5 h-5" />
                    )}
                    <p className="ml-1">{tweet?.likesCount}</p>
                </button>
            </div>

            {/* Update/Delete Menu */}
            {tweet?.owner?._id === userData?._id && (
                <div ref={ref} className="relative">
                    <button
                        onClick={() => setMenu((prev) => !prev)}
                        className="p-2 hover:bg-gray-800/50 rounded-full transition-all duration-300"
                    >
                        <BsThreeDotsVertical className="text-gray-400 hover:text-green-500" />
                    </button>
                    {menu && (
                        <div className="absolute right-0 w-32 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg text-sm border border-gray-700/50">
                            <button
                                onClick={() => handleUpdate()}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-800/50 hover:text-green-500 transition-all duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete()}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-800/50 hover:text-red-500 transition-all duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}

            <LoginPopup
                ref={LoginLikePopupDialog}
                message="Login to like this Tweet..."
                route={location.pathname}
            />
        </li>
    );
}

export default Tweet;