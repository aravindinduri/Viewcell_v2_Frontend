import React from "react";
import { useSelector } from "react-redux";
import { LuUsers } from "react-icons/lu";

function ChannelEmptySubscribed() {
    const { status, userData } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user.user);

    return (
        <div className="flex justify-center p-6 bg-gray-900 ">
            <div className="w-full max-w-lg text-center mt-8 bg-gray-800 p-6 rounded-xl shadow-2xl">
                <p className="mb-4">
                    <span className="inline-flex rounded-full bg-green-600 p-3 text-white">
                        <LuUsers className="w-10 h-10" /> 
                    </span>
                </p>
                <h5 className="text-2xl font-semibold mb-3 text-white">
                    No Channel Subscribed
                </h5>
                <p className="text-sm text-gray-400 mb-4">
                    {status && user.username === userData.username ? (
                        <>
                            Your channel has yet to <strong>Subscribe</strong> to a new
                            channel.
                        </>
                    ) : (
                        <>
                            This channel has yet to <strong>Subscribe</strong> to a new
                            channel.
                        </>
                    )}
                </p>
                <button
                    className="px-6 py-2 rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors"
                    onClick={() => alert('Redirecting to subscribe page...')}
                >
                    Browse Channels
                </button>
            </div>
        </div>
    );
}

export default ChannelEmptySubscribed;
