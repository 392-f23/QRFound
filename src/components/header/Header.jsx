import React from "react";
import "./Header.css";
import { useAuthState, signInWithGoogle, signOut } from "../../utilities/firebase";

const Header = ({ user }) => {
  return (
    <div className="header-div">
      <img className="qr-icon" src="/qr.png" alt="QR Icon" />
      <h1>QR Found</h1>

      <div className="header-button">
        {user ? (
          <button className="google-signin-btn" onClick={signOut}>
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
  );
};

export default Header;
