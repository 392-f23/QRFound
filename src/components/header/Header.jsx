import React from "react";
import "./Header.css";
import {
  useAuthState,
  signInWithGoogle,
  signOut,
} from "../../utilities/firebase";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div className="header-div">
      <div className="left-header">
        <img className="qr-icon" src="/qr.png" alt="QR Icon" />
        <h1>QR Found</h1>
      </div>
      <div className="right-header">
        {user && <a href="/">MY ITEMS</a>}
        {user && <a href="/activate">ACTIVATE</a>}
        <div className="header-button">
          {user ? (
            <button className="google-signed-in-btn" onClick={signOut}>
              <img
                src={user.photoURL || "url_to_default_profile_pic.png"}
                alt={user.displayName || "User Profile"}
              />
            </button>
          ) : (
            <button className="google-signin-btn" onClick={signInWithGoogle}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
