import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <button className="footer-btn home-btn">
        <Link className="nav-link" to="/">
          <img src="icons/home.png" alt="Home" />
        </Link>
      </button>
      <button className="footer-btn post-btn">
        <Link className="nav-link" to="/activate">
          <img src="icons/add.png" alt="add" />
        </Link>
      </button>
    </div>
  );
};

export default Footer;
