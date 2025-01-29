import React from "react";
import { useSelector } from "react-redux";
import { LuUsers } from "react-icons/lu";

function ChannelEmptySubscribed() {
    const { status, userData } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user.user);

    return (
        <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
            <div className="w-full max-w-lg text-center mt-8 bg-white p-6 rounded-xl shadow-lg">
                <p className="mb-4">
                    <span className="inline-flex rounded-full bg-green-600 p-3 text-white">
                        <LuUsers className="w-8 h-8" />
                    </span>
                </p>
                <h5 className="text-xl font-semibold mb-3 text-gray-800">
                    No Channel Subscribed
                </h5>
                <p className="text-sm text-gray-500 mb-4">
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
