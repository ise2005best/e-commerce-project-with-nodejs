import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context.js";
import { userContext } from '../../context/user.context.js';
import CartIcon from "../cart/cart.component.jsx";
import CartDropdown from "../cart-dropdown/cart-dropdown.component.jsx";
import './navbar.styles.scss'
const NavBar = () => {
        const {isCartOpen} = useContext(CartContext)
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
                    <CartIcon/>
                </div>
                {
                  isCartOpen && <CartDropdown/>
                }
                   

            </div>
        </Fragment>

    )
}
export default NavBar;