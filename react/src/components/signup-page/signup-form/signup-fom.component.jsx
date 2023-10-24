import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import LogIn from "../../login-form/login";
import axios from 'axios';
import './signup-form.styles.scss';
const initialFields = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [fields, setFields] = useState(initialFields);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const {firstName, lastName, email, password, confirmPassword } = fields;
    const navigate = useNavigate();
    localStorage.setItem('usersEmail',fields.email)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8002/sign-up', fields, {withCredentials:true}); // withCredentials are set to true to allow cookies
            if (response.data === 'Email already exists') {
                setErrorMessages("Email already exists");
            } else if(response.data === 'Success'){
                navigate('/verify-email');
            }
           
        } catch (error) {
            console.error(error);
            setErrorMessages('An error occurred. Please try again later.');
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
   
    return (
        <div className="body">
            <div className="signup-container">
            <h2 className="header">SIGN UP NOW!</h2>
            <form onSubmit={handleSubmit}>
                <div className="text-fields">
                    <LogIn type=""
                        required
                        placeholder="First Name"
                        className="sign-in-text"
                        onChange={handleChange}
                        name="firstName"
                        value={firstName} 
                        />
                        <LogIn type=""
                        required
                        placeholder="Last Name"
                        className="sign-in-text"
                        onChange={handleChange}
                        name="lastName"
                        value={lastName} 
                        />
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
                            value={password} />
                        <Icon
                            className="eye-icon"
                            icon={showPassword ? eyeOff : eye}
                            onClick={togglePassword} />
                    </div>

                    <LogIn type='password'
                        required
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className='sign-in-text'
                        name="confirmPassword"
                        value={confirmPassword} />
                </div>
                <p className="error-message">{errorMessages}</p>
                <div className="password-check-list-container">
                    <PasswordChecklist
                        className="password-check-list"
                        rules={['minLength', 'specialChar', 'capital', 'number', 'match']}
                        minLength={8}
                        value={password}
                        valueAgain={confirmPassword}
                        messages={{
                            minLength: 'Password has more than 8 characters.',
                            specialChar: 'Password has special characters.',
                            number: 'Password has a number.',
                            capital: 'Password has a capital letter.',
                            match: 'Passwords match.',
                        }}
                        onChange={(isValid) => { setPasswordValid(isValid) }}
                    />
                </div>
                <button type="submit" className="submit-button"> Submit</button>
            </form>
            </div>
        </div>
    )
}

export default SignUpForm;
