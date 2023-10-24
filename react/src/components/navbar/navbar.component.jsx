import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context.js";
import SearchBar from "../category-page/searchbar-navbar.component.jsx";
import CartIcon from "../cart/cart.component.jsx";
import { userContext } from "../../context/user.context.js";
import CartDropdown from "../cart-dropdown/cart-dropdown.component.jsx";
import "./navbar.styles.scss";

const NavBar = () => {
  const { isCartOpen } = useContext(CartContext);
  const { currentUser } = useContext(userContext)

  const [showNavLinks, setShowNavLinks] = useState(false);
 

  

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
           <SearchBar/>

            <Link className="nav-link" to={"/"}>
              HOME
            </Link>

            <Link to="#" className="nav-link">
              CAKES
            </Link>
            {
              currentUser ? (
                <span className="nav-link">
                  Hello {currentUser}
                </span>
              ) : (
                <Link className="nav-link" to={"/sign-in"} >
                  SIGN-IN
                </Link>
              )
            }


            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
