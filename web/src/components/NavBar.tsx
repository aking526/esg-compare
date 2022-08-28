import React from "react";
import { Link } from "react-router-dom";
import Github_Logo from "../assets/GitHub-Mark-120px-plus.png";
import { Github_URL } from "../mods/Links";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-evenly bg-sky-300 p-5">
      <h1 className="text-2xl font-modern"><Link to="/">Home</Link></h1>
      <h1 className="text-2xl font-modern"><Link to="/research">Research</Link></h1>
      <h1 className="text-2xl font-modern"><Link to="/about">About</Link></h1>
      <a href={Github_URL}><img src={Github_Logo} alt="" width="30" height="30" /></a>
    </div>
  );
};

export default NavBar;
