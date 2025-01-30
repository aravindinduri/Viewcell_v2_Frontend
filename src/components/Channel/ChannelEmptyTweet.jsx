import React from "react";
import { useSelector } from "react-redux";
import { TiMessages } from "react-icons/ti";

function ChannelEmptyTweet() {
    const { status, userData } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user.user);

    return (
        <div className="flex justify-center p-6 bg-gray-900">
            <div className="w-full max-w-lg text-center mt-8 bg-gray-800 p-6 rounded-xl shadow-2xl">
                <p className="mb-4">
                    <span className="inline-flex rounded-full bg-green-600 p-3 text-white">
                        <TiMessages className="w-10 h-10" />
                    </span>
                </p>
                <h5 className="text-2xl font-semibold mb-3 text-white">
                    No Tweets
                </h5>
                <p className="text-sm text-gray-400 mb-4">
                    {status && user.username === userData.username ? (
                        <>
                            You have yet to make an <strong>Announcement</strong>.
                        </>
                    ) : (
                        <>
                            This channel has yet to make an <strong>Announcement</strong>.
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default ChannelEmptyTweet;
