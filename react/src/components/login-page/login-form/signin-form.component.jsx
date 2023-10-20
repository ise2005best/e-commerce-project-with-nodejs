import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import LogIn from "../../login-form/login";
import './signin-form.styles.scss';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignInForm = () => {
    const navigate = useNavigate();
    const initialFields = {
        email: '',
        password: '',
    }
    const [fields, setFields] = useState(initialFields);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState('')
    const { email, password } = fields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8002/sign-in', fields)
            if (response.data === "Success") {
                navigate('/')
            } else if (response.data === "Incorrect password") {
                setErrorMessages('Incorrect password')
            } else if (response.data === "User not found") {
                setErrorMessages('User not found')
            } else {
                setErrorMessages('An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error(error)
            setErrorMessages('An error occurred. Please try again later.');
        }

    }


    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="sign-in">

            <h1 className="login"> LOGIN </h1>
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
