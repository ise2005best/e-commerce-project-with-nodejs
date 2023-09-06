import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import {userContext} from '../../context/context.js';
import { signUserOut } from "../utils/firebase/firebase-for-signIn/firebase-sign-in.utils";
import './navbar.styles.scss'

const NavBar = () => {
    const { currentUser } = useContext(userContext);
    const handleSignOutUser = async () => {
        await signUserOut();
    }

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
                    
                    <Link to="#" onClick={() => scrollByAmount(700)} className="nav-link" >
                        CAKES
                    </Link>
                    
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={handleSignOutUser}> {''}
                                SIGN OUT {''}
                            </span>
                        ) : (
                            <Link className="nav-link" to={'/sign-in'} style={{ marginRight: '40px' }}>
                                SIGN IN
                            </Link>
                        )
                    }

                </div>

            </div>
        

        </Fragment>

    )
}
export default NavBar;