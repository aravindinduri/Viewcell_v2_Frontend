import React, { useRef, useState, useEffect } from "react";
import ChannelEmptyPlaylist from "./ChannelEmptyPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylist } from "../../hooks/getUserPlaylist";
import { Link, useLocation, useParams } from "react-router-dom";
import { icons } from "../../assets/Icons.jsx";
import PlaylistForm from "../Playlist/PlaylistForm.jsx";
import { IoAdd } from "react-icons/io5";
import formatDate from "../../utils/formatDate.js";

function ChannelPlaylist() {
    const dispatch = useDispatch();
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const { status, userData } = useSelector((state) => state.auth);
    const userId = useSelector((state) => state.user.user._id);
    const dialog = useRef();
    const location = useLocation();

    useEffect(() => {
        getUserPlaylist(dispatch, userId || userData._id).then(() => setLoading(false));
    }, [username]);

    const playlists = useSelector((state) => state.user.userPlaylist);

    if (loading) {
        return (
            <span className="flex justify-center mt-20">{icons.bigLoading}</span>
        );
    }

    function popupPlaylistForm() {
        dialog.current.open();
    }

    let counter = 0;

    return (
        <>
            <PlaylistForm ref={dialog} route={location} />
            {playlists?.length > 0 ? (
                <>
                    {status && userData?.username === username && (
                        <div className="flex items-center justify-center">
                            <button
                                onClick={popupPlaylistForm}
                                className="mt-4 inline-flex items-center gap-x-2 bg-green-600 hover:bg-green-700 border border-transparent rounded-lg hover:border-white px-5 py-2 font-semibold text-white transition-all duration-150 ease-in-out"
                            >
                                <IoAdd className="w-5 h-5" />
                                New Playlist
                            </button>
                        </div>
                    )}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {playlists.map((playlist) => {
                            if (
                                playlist.videosCount > 0 ||
                                (status && userData?.username === username)
                            ) {
                                counter++;
                                return (
                                    <li
                                        key={playlist._id}
                                        className="group relative bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out"
                                    >
                                        <Link to={`/playlist/${playlist._id}`}>
                                            <div className="relative">
                                                <img
                                                    src={
                                                        playlist?.thumbnail
                                                            ? playlist.thumbnail
                                                            : "https://res.cloudinary.com/dgfh6tf6j/image/upload/v1727779646/Screenshot_2024-10-01_161624_bwpw83.png"
                                                    }
                                                    alt="image"
                                                    className="w-full h-[200px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 p-4 text-white">
                                                    <p className="flex justify-between text-lg font-semibold">
                                                        {playlist.name}
                                                        <span className="text-sm text-gray-300">
                                                            {playlist.videosCount}{" "}
                                                            video{playlist.videosCount > 1 ? "s" : ""}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm text-gray-300">
                                                        {playlist.totalViews}{" "}
                                                        view{playlist.totalViews > 1 ? "s" : ""} ·{" "}
                                                        {formatDate(playlist.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 bg-zinc-700 rounded-b-lg">
                                                <p className="text-sm text-gray-200 overflow-hidden line-clamp-2">
                                                    {playlist.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    {counter === 0 && <ChannelEmptyPlaylist />}
                </>
            ) : (
                <ChannelEmptyPlaylist />
            )}
        </>
    );
}

export default ChannelPlaylist;
