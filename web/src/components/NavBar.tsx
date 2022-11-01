import React from "react";
import { Link } from "react-router-dom";
import { Github_URL } from "../utils/Links";
import { AdjustmentsHorizontalIcon, UserCircleIcon, BarsArrowUpIcon, HomeIcon } from "@heroicons/react/20/solid";

const NavBar: React.FC = () => {
  return (
    <div className="relative flex flex-row items-center justify-evenly bg-nav-red border-b-2 border-black p-5 font-modern text-black font-bold text-xl">
      <div>
        <Link className="flex flex-row justify-center items-center" to="/">
          <span>Home</span>
          <HomeIcon className="h-6 w-6 mx-1" />
        </Link>
      </div>
      <div>
        <Link className="flex flex-row justify-center items-center" to="/rankings">
          <span>Rankings</span>
          <BarsArrowUpIcon className="h-7 w-7 mx-1"/>
        </Link>
      </div>
      <div>
        <Link className="flex flex-row justify-center items-center" to="/compare">
          <span>Compare</span>
          <AdjustmentsHorizontalIcon className="h-6 w-6 mx-1"/>
        </Link>
      </div>
      <div>
        <Link className="flex flex-row" to="/about">
          <span>About</span>
          <UserCircleIcon className="h-7 w-7 mx-1"/>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
