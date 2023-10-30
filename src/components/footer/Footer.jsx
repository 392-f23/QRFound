import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useProfile } from "../../utilities/profile.js";

const Footer = () => {
  const [user] = useProfile();

  return (
    <div className="footer">
      {user.user && (
        <button className="footer-btn home-btn">
          <Link className="nav-link" to="/">
            <img src="/home.png" alt="Home" />
          </Link>
        </button>
      )}
      {user.user && (
        <button className="footer-btn post-btn">
          <Link className="nav-link" to="/activate">
            <img src="/add.png" alt="add" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Footer;
