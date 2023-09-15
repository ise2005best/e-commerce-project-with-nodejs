import React from "react";
import SignInForm from "./login-form/signin-form.component";
import SignInWithGoogle from "./login-with-google/signin-with-google.component";
import '../login-page/login-form/signin-form.styles.scss'
const SignInPage = () => {
    return (
        <div style={{
            backgroundColor: "#1D2743",
            paddingBottom: "70px",
            paddingTop: "70px"
        }} >
            <div className="sign-in">
                <SignInForm />
                <SignInWithGoogle />
            </div>
        </div>

    )
}
export default SignInPage;