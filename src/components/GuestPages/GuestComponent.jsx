import React from "react";
import { BiLogInCircle } from "react-icons/bi"; // Stylish Login Icon
import { Link } from "react-router-dom"; // Import Link for navigation

function GuestComponent({
    icon,
    title = "Sign in to access exclusive content",
    subtitle = "Unlock your personalized feed, subscriptions, and more!",
    route = "/login", 
    guest = true,
}) {
    return (
        <section className="w-full flex justify-center pb-20 sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex relative top-20 justify-center p-6">
                <div className="w-full max-w-sm text-center bg-gray-900 shadow-lg rounded-xl p-6">
                    <div className="mb-4 flex justify-center">
                        <span className="inline-flex w-32 h-32 rounded-full bg-gray-800 p-4 text-green-400 shadow-lg">
                            {icon}
                        </span>
                    </div>
                    <h5 className="mt-4 mb-2 text-2xl font-bold text-white">
                        {title}
                    </h5>
                    <p className="text-gray-400">{subtitle}</p>

                    {guest && (
                        <Link
                            to={route}
                            className="mt-6 inline-flex items-center gap-x-3 rounded-lg bg-green-600 hover:bg-green-500 px-5 py-3 font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            <BiLogInCircle className="w-6 h-6" />
                            Sign In Now
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default GuestComponent;
