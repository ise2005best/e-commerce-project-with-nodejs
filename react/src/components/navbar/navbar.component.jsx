import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from '../../context/context.js';
import { Home, Cake, Person } from "@mui/icons-material"; 
import './navbar.styles.scss';

const NavBar = () => {
  function scrollByAmount(amount) {
    window.scrollBy({
      top: amount,
      behavior: 'smooth',
    });
  }

  return (
    <Fragment>
      <div className="nav-bar">
        <Link className="logo-link" to={'/'}>
          ISESEN
        </Link>

        <div className="nav-bar-container">
          <Link className="nav-link" to={'/'}>
          <Home />
         <span className="nav-texts">HOME</span>   
          </Link>
          <Link to="#" className="nav-link">
            <Cake/>
          <span className="nav-texts">CAKES</span>  
          </Link>
          <Link className="nav-link" to={'/sign-in'} style={{ marginRight: '40px' }}>
            <Person/>
           <span className="nav-texts">SIGN IN</span> 
          </Link>
          
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;