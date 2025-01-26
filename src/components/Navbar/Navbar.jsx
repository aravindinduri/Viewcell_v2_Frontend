import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import { useSelector } from "react-redux";
import Search from "./Search";
import { Link } from "react-router-dom";

function Navbar() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    return (
        <nav className="flex flex-wrap justify-between items-center bg-black p-4 gap-4 sm:gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
                <Logo />
            </Link>

            {/* Search Bar */}
            <div className="flex-grow max-w-[600px] mx-4">
                <Search />
            </div>

            {/* Auth Buttons or User Avatar */}
            <div className="flex items-center gap-2 sm:gap-4">
                {!authStatus && (
                    <>
                        <Link to="/login">
                            <Button className="cursor-pointer hover:bg-gray-500 text-white px-4 py-2 rounded transition-all duration-150 ease-in-out active:scale-95 sm:w-auto">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="cursor-pointer hover:bg-pink-600 text-white px-4 py-2 rounded bg-pink-700 transition-all duration-150 ease-in-out active:scale-95 sm:w-auto">
                                Sign up
                            </Button>
                        </Link>
                    </>
                )}

                {authStatus && userData && (
                    <Link to={`/channel/${userData.username}`} aria-label="User Profile">
                        <img
                            src={userData.avatar}
                            alt={userData.username}
                            className="object-cover h-10 w-10 rounded-full border-2 border-gray-500 hover:border-pink-600 transition-all duration-150 ease-in-out"
                        />
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;