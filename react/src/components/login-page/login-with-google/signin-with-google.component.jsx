import React, { useState } from "react";
import '../login-with-google/signin-with-google.styles.scss';
const SignInWithGoogle = () => {
    const [errorMessages, setErrorMessages] = useState('')

    return (
        <div className="google-button-container">
            <p className="texts-divider">Or sign in with Google</p>
            <div className="google-button-wrapper">
                <button className="google-button">
                    <img className='google-icon' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="google logo png" />
                    Google
                </button>
            </div>
            <p className="error-messages">{errorMessages}</p>
        </div>

    )
}


export default SignInWithGoogle;
