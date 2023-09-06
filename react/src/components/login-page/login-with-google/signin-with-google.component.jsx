import React, { useState } from "react";
import '../login-with-google/signin-with-google.styles.scss';
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase-for-signIn/firebase-sign-in.utils";
const SignInWithGoogle = () => {
    const [errorMessages, setErrorMessages] = useState('')
    const LogGoogleUser = async () => {
        try {
            // this extracts the user object from the function
            const { user } = await signInWithGooglePopup();
            createUserDocumentFromAuth(user);
        } catch (error) {
            setErrorMessages("Error signing in with Google", error);
        }
    }

    return (
        <div className="google-button-container">
            <p className="texts-divider">Or sign in with Google</p>
            <div className="google-button-wrapper">
                <button onClick={LogGoogleUser} className="google-button">
                    <img className='google-icon' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="google logo png suite everything you need know about google newest" />
                    Google
                </button>
            </div>
            <p className="error-messages">{errorMessages}</p>
        </div>

    )
}


export default SignInWithGoogle;