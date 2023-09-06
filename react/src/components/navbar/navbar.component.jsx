import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import {userContext} from '../../context/context.js';
import {ReactComponent as Logo1} from '../../static/crown.svg';
import './navbar.styles.scss'
const NavBar = () =>{
    const {currentUser} = useContext(userContext);
    return(
        <Fragment>
           <div className="nav-bar">
            
            <Link className="logo-link" to={'/'}>
               <Logo1 className='logo'/>
            </Link>
     
        <div className="nav-bar-container">
            <Link className="nav-link" to={'/shop'}>
                SHOP
            </Link>
            {
                currentUser ? (
                    <span className="nav-link" > {''}
                        Sign Out {''}
                    </span>
                ):(
                <Link className="nav-link" to={'/sign-in'}>
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