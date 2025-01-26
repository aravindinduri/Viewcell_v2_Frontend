import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import axiosInstance from "../utils/axios.helper";
import { unSetUser } from "../store/authSlice";
import { toast } from "react-toastify";

function Sidebar() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const NavElements = [
        { name: "Home", route: "/", icon: <MdHome className="w-6 h-6" /> },
        {
            name: "Tweets",
            route: "/tweets",
            icon: <RiMessage2Line className="w-6 h-6" />,
        },
        {
            name: "Liked Videos",
            route: "/liked-videos",
            icon: <AiOutlineHeart className="w-6 h-6" />,
        },
        {
            name: "History",
            route: "/history",
            icon: <BiHistory className="w-6 h-6" />,
        },
        {
            name: "Subscriptions",
            route: "/subscriptions",
            icon: <MdSubscriptions className="w-6 h-6" />,
        },
        {
            name: "My Channel",
            route: `/channel/${userData?.username}`,
            icon: <MdVideoLibrary className="w-6 h-6" />,
        },
    ];

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/users/logout", {});
            dispatch(unSetUser());
            localStorage.removeItem("accessToken");
            toast.success("Logged out successfully...");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`bg-black text-white h-full flex flex-col border-r-[2px] border-green-500 transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-16" : "w-64"
            }`}
        >
            <button
                onClick={toggleSidebar}
                className="p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg self-end m-2"
                aria-label="Toggle sidebar"
            >
                {isCollapsed ? "»" : "«"}
            </button>

            <ul className="flex-grow px-2 py-2">
                {NavElements.map((item, index) => (
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-green-400" : "text-gray-300"}`
                        }
                        to={item.route}
                        key={index}
                    >
                        <li
                            className={`py-2 hover:bg-gray-700 transition-all duration-100 cursor-pointer flex items-center rounded-lg ${
                                isCollapsed ? "justify-center" : "px-5"
                            }`}
                        >
                            <span className={`${isCollapsed ? "" : "mr-2"}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <div>{item.name}</div>}
                        </li>
                    </NavLink>
                ))}
                {authStatus && (
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-green-400" : "text-gray-300"}`
                        }
                        to="/admin/dashboard"
                    >
                        <li
                            className={`py-2 hover:bg-gray-700 transition-all duration-100 cursor-pointer flex items-center rounded-lg ${
                                isCollapsed ? "justify-center" : "px-5"
                            }`}
                        >
                            <span className={`${isCollapsed ? "" : "mr-2"}`}>
                                <CgProfile className="w-6 h-6" />
                            </span>
                            {!isCollapsed && "Dashboard"}
                        </li>
                    </NavLink>
                )}
            </ul>

            <ul className="px-2 py-2">
                {authStatus && (
                    <li
                        onClick={handleLogout}
                        className={`py-2 hover:bg-gray-700 transition-all duration-100 cursor-pointer flex items-center rounded-lg ${
                            isCollapsed ? "justify-center" : "px-5"
                        }`}
                    >
                        <span className={`${isCollapsed ? "" : "mr-2"}`}>
                            <RiLogoutBoxLine className="w-6 h-6" />
                        </span>
                        {!isCollapsed && "Logout"}
                    </li>
                )}
                {authStatus && (
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-green-400" : "text-gray-300"}`
                        }
                        to="/settings"
                    >
                        <li
                            className={`py-2 hover:bg-gray-700 transition-all duration-100 cursor-pointer flex items-center rounded-lg ${
                                isCollapsed ? "justify-center" : "px-5"
                            }`}
                        >
                            <span className={`${isCollapsed ? "" : "mr-2"}`}>
                                <AiOutlineSetting className="w-6 h-6" />
                            </span>
                            {!isCollapsed && "Settings"}
                        </li>
                    </NavLink>
                )}
                <NavLink
                    className={({ isActive }) =>
                        `${isActive ? "text-green-400" : "text-gray-300"}`
                    }
                    to="/contact"
                >
                    <li
                        className={`py-2 hover:bg-gray-700 transition-all duration-100 cursor-pointer flex items-center rounded-lg ${
                            isCollapsed ? "justify-center" : "px-5"
                        }`}
                    >
                        <span className={`${isCollapsed ? "" : "mr-2"}`}>
                            <FiHelpCircle className="w-6 h-6" />
                        </span>
                        {!isCollapsed && "Support"}
                    </li>
                </NavLink>
            </ul>
        </div>
    );
}

export default Sidebar;