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

         
            <Link className="nav-link" to={"/"}>
              HOME
            </Link>

            <Link to="#" className="nav-link">
              CAKES
            </Link>

            <Link className="nav-link" to={"/sign-in"} >
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
