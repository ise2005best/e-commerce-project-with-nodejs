import { useState } from "react";
import EmailPicture from '../../../static/imag12.avif';
import InstagramIcon from '../../../static/instagram.png';
import TwitterIcon from '../../../static/twitter.png';
import WhatsappIcon from '../../../static/whatsapp.png';
import Email from "../../../static/email.gif"
import './signup-redirect.styles.scss';
const RedirectSignUp = () => {
    const [errorMessages, setErrorMessages] = useState('');
    // const emailVerification = async () =>{
    //     try {
    //         await verifyEmail(user) 
    //        setErrorMessages('Email verification has been sent successfully')
    //     } catch (error) {
    //         console.error('Error sending verification email', error)
    //         setErrorMessages('An error occurred while sending email verification')
    //     }
    // }
    return (
        <div style={{ backgroundColor: "#1d2743" }}>
            <div className="container">
                <div className="confirm-email-container">
                    <div className="email-image-container">
                        <img src={Email}
                            alt="email verifications"
                            className="email-image" />
                    </div>
                    <h1 className="major-text">
                        Thank you for signing up with ISESEN
                    </h1>
                    <p className="error-message"> {errorMessages}</p>
                    < button
                        type='button'
                        className="email-button"
                    >
                        Verify email address
                    </button>

                    <div className="icons">
                        <img src={WhatsappIcon}
                            alt="whatsapp-icon"
                            className="little-icon" />
                        <img src={InstagramIcon}
                            alt="instagram-icon"
                            className="little-icon" />
                        <img src={TwitterIcon}
                            alt="twitter-icon"
                            className="little-icon" />
                    </div>
                </div>
                <div className="bottom-page">

                    <div className="copyright-text">
                        <p>
                            © Copyrights 2023, ISESEN
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedirectSignUp;