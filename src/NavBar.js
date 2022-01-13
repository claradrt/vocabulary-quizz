import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [clicked, setClicked] = useState(false);

  const menuItems = [
    { title: "Quiz", url: "/home", cName: "nav-links" },
    { title: "My vocabulary list", url: "/vocabulary", cName: "nav-links" },
  ];

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <nav className="NavBarItems">
      <h1 className="navbar-logo">
        <FontAwesomeIcon icon={faReact} />
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={clicked ? faTimes : faBars} />
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url} onClick={handleClick}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
