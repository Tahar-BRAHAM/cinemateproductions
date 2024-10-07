import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/CINEMATE-LOGO.png";

const Navbar = ({ authToken, logout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0); // Using useRef to keep track of the scroll position
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsHidden(true); // Hide navbar when scrolling down
      } else {
        setIsHidden(false); // Show navbar when scrolling up
      }
      lastScrollY.current = window.scrollY; // Update the scroll position reference
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavLinkClick = () => {
    setIsExpanded(false);
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        isExpanded ? "expanded" : ""
      } ${isHidden ? "navbar-hidden" : ""}`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isExpanded ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/"
                onClick={handleNavLinkClick}
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={handleNavLinkClick}
              >
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/work"
                onClick={handleNavLinkClick}
              >
                PORTFOLIO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/services"
                onClick={handleNavLinkClick}
              >
                SERVICES
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact-us"
                onClick={handleNavLinkClick}
              >
                CONTACT
              </NavLink>
            </li>
            {authToken && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin"
                    onClick={handleNavLinkClick}
                  >
                    ADMIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    LOG-OUT
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
