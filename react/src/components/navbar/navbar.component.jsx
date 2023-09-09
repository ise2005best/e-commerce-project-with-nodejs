import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from '../../context/context.js';
import './navbar.styles.scss'
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
                        HOME
                    </Link>

                    <Link to="#" className="nav-link" >
                        CAKES
                    </Link>


                    <Link className="nav-link" to={'/sign-in'} style={{ marginRight: '40px' }}>
                        SIGN IN
                    </Link>


                </div>

            </div>


        </Fragment>

    )
}
export default NavBar;