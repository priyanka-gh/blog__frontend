import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { signout, isAuthenticated } from "../index";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isAuthenticated() ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const handleSignout = () => {
    signout(() => {
      // Perform any additional actions on signout if needed
    });
  };

  return (
    <div className="top">
      <div className={colorChange ? "navbar colorChange" : "navbar"}>
        <div>
          <a className="ecrire" href="/">
            écrire
          </a>
        </div>
        <div className="insideNav">
          {!loggedIn && (
            <a href="/login" className="link">
              Login
            </a>
          )}
          {!loggedIn && (
            <a href="/signup" className="link">
              Signup
            </a>
          )}
          {isAuthenticated() && (
            <a href="/myAllBlogs" className="link">
              My Work
            </a>
          )}
          {loggedIn && (
            <a href="/" className="link" onClick={handleSignout}>
              Signout
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
