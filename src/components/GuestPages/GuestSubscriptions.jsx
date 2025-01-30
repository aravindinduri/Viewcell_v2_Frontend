import React from 'react';
import GuestComponent from "./GuestComponent";
import { MdPlayCircleOutline } from "react-icons/md";

function GuestSubscriptions() {
    return (
        <GuestComponent
            title="Discover Your Favorite Videos"
            subtitle="Sign in to explore, save, and enjoy content from your favorite creators—all in one place."
            icon={
                <span className="w-full h-full flex items-center p-4 pb-5">
                    <MdPlayCircleOutline className="w-28 h-28 text-green-400" />
                </span>
            }
            route="/subscriptions"
        />
    );
}

export default GuestSubscriptions;
