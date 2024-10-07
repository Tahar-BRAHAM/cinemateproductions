import React from "react";
import "../styles/ComingSoon.css";
import logo from "../images/CINEMATE-LOGO.png"; // Adjust the path to your logo image

const ComingSoon = () => {
  return (
    <div className="comingSoonContainer">
      <div className="comingSoonContent">
        <img src={logo} alt="Cinemate Productions" className="comingSoonLogo" />
        <h1>Coming Soon</h1>
        <p>
          Our website is under construction. We'll be here soon with our new
          awesome site.
        </p>
        <div className="contactInfo">
          <p>
            <span className="contactIcon emailIcon"></span>Email:{" "}
            <a href="mailto:info@cinemate-productions.com">
              info@cinemate-productions.com
            </a>
          </p>
          <p>
            <span className="contactIcon phoneIcon"></span>Phone Number:{" "}
            <a href="tel:+4917669624139">+4917669624139</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
