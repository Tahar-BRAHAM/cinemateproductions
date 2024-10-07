import React from "react";
import "../styles/FollowMe.css";

const FollowMe = () => {
  return (
    <div className="footer-container">
      <div className="all-rights">
        All rights reserved © 2024 Cinemate Productions
      </div>
      <div className="follow-me">
        <span>Follow me:</span>
        <ul className="social-links">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61561670463129"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/cinemate.productions/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/cinemate-productions-286590316/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FollowMe;
