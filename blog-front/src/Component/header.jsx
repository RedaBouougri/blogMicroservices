// NavBar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen, SearchIcon } from '../Component/Icons.js'; 
import blackSearchIcon from '../Component/icons/search.png';
import profileImg from '../images/profile.png';
import authService from "../services/auth.service.js";

function NavBar() {
  const [click, setClick] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleClick = () => setClick(!click);

  const handleProfileClick = () => setShowProfileMenu(!showProfileMenu);

  const handleDisconnectClick = () => {
    // Call authService.logout() when the "Disconnect" link is clicked
    authService.logout();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Logo</span>
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>
          <div className="center-menu">
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/listpost"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/aboutpost"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/addpost"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/mypost"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  My Posts
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="search-container">
            <span className="search-icon" role="img" aria-label="search">
              <img src={blackSearchIcon} alt="Search" className="search-icon" />
            </span>
            <input type="text" />
          </div>
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="profile-info">
              <span className="profile-name">{"Hi "+authService.getCurrentUser().firstName}</span>
              <img
                src={profileImg}
                alt="Profile"
                className="profile-image"
                onClick={handleProfileClick}
              />
            </div>
            <ul className="profile-menu">
              {showProfileMenu && (
                <li>
                  <NavLink
                    exact
                    to="/profile"
                    activeClassName="active"
                    className="nav-links"
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              {showProfileMenu && (
                <li>
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleDisconnectClick}
                  >
                    Disconnect
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
