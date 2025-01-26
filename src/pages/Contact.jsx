import React from "react";
import { IoIosLink, IoMdMail, IoMdCall } from "react-icons/io";
// import profilePic from "../../assets/images/profile-pic.jpg"; // Replace with your profile picture path

function Contact() {
    return (
        <section className="w-full flex justify-center pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex relative top-20 justify-center p-4">
                <div className="w-full max-w-fit text-center">
                    <p className="mb-3 w-full">
                        <span className="inline-flex w-36 h-36 rounded-full bg-slate-900 p-2">
                            {/* <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            /> */}
                        </span>
                    </p>

                    <h5 className="mt-6 mb-7 text-2xl font-semibold">
                        Let's Connect!
                    </h5>

                    <ul className="text-center flex flex-col items-center space-y-4">
                        <li className="flex items-center">
                            <span className="w-9 h-9 rounded-full mr-4 flex items-center justify-center bg-gray-800">
                                <IoIosLink className="w-6 h-6 text-blue-500" />
                            </span>
                            <div className="h-full">
                                <h2 className="text-lg font-bold my-0">
                                    LinkedIn
                                </h2>
                                <a
                                    href="https://www.linkedin.com/in/aravind-induri"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm hover:text-blue-400 transition-all duration-300"
                                >
                                    /aravind-induri
                                </a>
                            </div>
                        </li>

                        <li className="flex items-center">
                            <span className="w-9 h-9 rounded-full mr-4 flex items-center justify-center bg-gray-800">
                                <IoIosLink className="w-6 h-6 text-purple-500" />
                            </span>
                            <div className="h-full">
                                <h2 className="text-lg font-bold my-0">
                                    GitHub
                                </h2>
                                <a
                                    href="https://github.com/aravindinduri"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm hover:text-blue-400 transition-all duration-300"
                                >
                                    /aravindinduri
                                </a>
                            </div>
                        </li>

                        <li className="flex items-center">
                            <span className="w-9 h-9 rounded-full mr-4 flex items-center justify-center bg-gray-800">
                                <IoMdMail className="w-6 h-6 text-red-500" />
                            </span>
                            <div className="h-full">
                                <h2 className="text-lg font-bold my-0">Email</h2>
                                <a
                                    href="mailto:aravindinduri@gmail.com"
                                    className="text-blue-500 text-sm hover:text-blue-400 transition-all duration-300"
                                >
                                    thearavindinduri@gmail.com
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Contact;