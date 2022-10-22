import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faSliders, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Github_URL } from "../mods/Links";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-evenly bg-sky-300 p-5 font-modern text-xl">
      <h1><Link to="/">Home <FontAwesomeIcon icon={faHouse}/></Link></h1>
      <h1><Link to="/rankings">Rankings  <FontAwesomeIcon icon={faBars}/></Link></h1>
      <h1><Link to="/compare">Compare</Link> <FontAwesomeIcon icon={faSliders}/></h1>
      <h1><Link to="/about">About <FontAwesomeIcon icon={faUserLarge}/></Link></h1>
      <a href={Github_URL}>Github <FontAwesomeIcon icon={faGithub} size="lg" /></a>
    </div>
  );
};

export default NavBar;
