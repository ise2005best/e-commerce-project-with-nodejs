import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context.js";
import CartIcon from "../cart/cart.component.jsx";
import CartDropdown from "../cart-dropdown/cart-dropdown.component.jsx";
import "./navbar.styles.scss";

const NavBar = () => {
  const { isCartOpen } = useContext(CartContext);
  const [isFocused, setIsFocused] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const PERSONICON = () =>
    <svg width="27" height="27" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.475 21.9376C7.19014 21.9376 1.823 22.8878 1.823 26.6934C1.823 30.499 7.15609 31.4833 13.475 31.4833C19.7599 31.4833 25.1255 30.5315 25.1255 26.7274C25.1255 22.9234 19.7939 21.9376 13.475 21.9376Z" stroke="#FE9000" stroke-width="2.4375" stroke-linecap="round" stroke-linejoin="round" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.475 16.5096C17.5994 16.5096 20.9422 13.1652 20.9422 9.04081C20.9422 4.9164 17.5994 1.57355 13.475 1.57355C9.35055 1.57355 6.00615 4.9164 6.00615 9.04081C5.99222 13.1513 9.31341 16.4957 13.4223 16.5096H13.475Z" stroke="#FE9000" stroke-width="2.32143" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchClick = () => {
    // Handle the search
  };

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const navBarStyles = {
    height: showNavLinks ? "150px" : "100px",
  };

  const navlinks = {
    visibility: showNavLinks ? "visible" : "hidden",
  };


  return (
    <Fragment>
      <div className="nav-bar" style={navBarStyles}>
        <div className="sidebar-icon" onClick={toggleNavLinks}>
          ☰
        </div>
        <Link className="logo-link" to={"/"}>
          ISESEN
        </Link>

        <div className="nav-bar-container">
          <div className="nav-links" style={navlinks}>
            <div className={`search-container ${isFocused ? "focused" : ""}`}>
              <div className="search-icon" onClick={handleSearchClick}></div>
              <input
                type="text"
                placeholder="search ... "
                className={`search-box ${isFocused ? "focused" : ""}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>


           <Link className="nav-link" to={"/sign-in"} >
           <PERSONICON/>
    SIGN-IN
            </Link>

            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
