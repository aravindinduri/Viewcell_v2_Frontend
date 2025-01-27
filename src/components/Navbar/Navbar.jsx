import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search as SearchIcon } from 'lucide-react';

import Logo from "../Logo";
import Button from "../Button";
import Search from "./Search";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="w-full max-w-[600px] block lg:hidden">
          <Search />
        </div>

        <div className="hidden lg:block flex-grow max-w-[600px] mx-6">
          <Search />
        </div>

        <div className="flex items-center space-x-4">
          {!authStatus ? (
            <>
              <Link to="/login">
                <Button className="hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-150 ease-in-out active:scale-95">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="hover:bg-green-600 text-white px-4 py-2 rounded-lg bg-green-700 transition-all duration-150 ease-in-out active:scale-95">
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            userData && (
              <Link 
                to={`/channel/${userData.username}`} 
                aria-label="User Profile"
              >
                <img
                  src={userData.avatar}
                  alt={userData.username}
                  className="object-cover h-10 w-10 rounded-full border-2 border-green-500 hover:border-green-600 transition-all duration-150 ease-in-out"
                />
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;