import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import LogIn from "../../login-form/login";
import './signin-form.styles.scss';
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase-for-signIn/firebase-sign-in.utils";

const SignInForm = () => {
    const initialFields = {
        email: '',
        password: '',
    }
    const [fields, setFields] = useState(initialFields);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState('')
    const { email, password } = fields;
    const resetForm = () => {
        setFields(initialFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetForm();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    setErrorMessages("Incorrect password")
                    break;
                case 'auth/user-not-found':
                    setErrorMessages('no user found')
                    break;
                default:
                    setErrorMessages(error)
            }
        }
    }


    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <h1 className="login"> SIGN IN </h1>
            <form onSubmit={handleSubmit}>
                <LogIn type="email"
                    required
                    placeholder="Email"
                    className='sign-in-text'
                    onChange={handleChange}
                    name="email"
                    value={email} />
                <div className="password-container">
                    <LogIn type={showPassword ? 'text' : 'password'}
                        required
                        className='sign-in-text'
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={password}

                    />
                    <Icon
                        icon={showPassword ? eyeOff : eye}
                        onClick={togglePassword}
                        className="eye-icon"
                    />
                </div>
                <p className="error-messages">{errorMessages}</p>
                <Link className="forget-password-button" to={'/forget-password'}>
                    Forgot Password?
                </Link>
                <br />
                <div className="button-container">
                    <button type="submit"
                        className="login-button"
                    > Sign In </button>
                </div>

                <Link className="sign-up-link" to={'/sign-up'} >
                    Dont have an account? Please sign up
                </Link>


            </form>
        </div>
    )
}

export default SignInForm;
