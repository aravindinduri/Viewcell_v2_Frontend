import React from "react";
import GuestComponent from "./GuestComponent";
import { MdPlayCircleOutline } from "react-icons/md";

function GuestSubscriptions() {
    return (
        <GuestComponent
            title="Discover Your Favorite Videos"
            subtitle="Sign in to follow creators, save content, and never miss an update!"
            icon={
                <div className="flex items-center justify-center w-full h-full p-4">
                    <MdPlayCircleOutline size={112} className="text-green-400" />
                </div>
            }
            route="/login?redirect=/subscriptions"
        />
    );
}

export default GuestSubscriptions;
