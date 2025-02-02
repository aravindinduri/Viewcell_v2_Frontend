import React from "react";
import { GoHistory } from "react-icons/go";
import GuestComponent from "./GuestComponent";

function GuestHistory() {
    return (
        <GuestComponent
            title="Keep track of what you watch"
            subtitle="Sign in to see your watch history."
            icon={
                <div className="flex items-center justify-center w-full h-full p-4">
                    <GoHistory size={128} className="text-green-400" />
                </div>
            }
            route="/login?redirect=/history" 
        />
    );
}

export default GuestHistory;
