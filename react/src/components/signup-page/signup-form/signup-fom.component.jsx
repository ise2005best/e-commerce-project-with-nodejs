import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import LogIn from "../../login-form/login";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase-for-signUp/firebase-sign-up.utils";
import './signup-form.styles.scss';
const initialFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [fields, setFields] = useState(initialFields);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const { displayName, email, password, confirmPassword } = fields;
   const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:8002/sign-up', fields);
            if (response.data === 'Email already exists') {
                setErrorMessages("Email already exists"); 
             } else if(response.data === 'Success'){
                navigate('/thank-you-for-signing-up-with-us');
             }
        } catch (error) {
            console.error(error);
        }
    };




const togglePassword = () => {
    setShowPassword(!showPassword);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
   
    return (
        <div style={{backgroundColor:"#1D2743", padding:"100px"}}>
            
            <div className="signup-container">
            <h2 className="header">SIGN UP NOW!</h2>
            <form onSubmit={handleSubmit}>
            <div className="text-fields">
            <LogIn type="text"
                    required
                    placeholder="Name"
                    className="sign-in-text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />
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
               
                <p className="error-message">{errorMessages}</p>
                <button type="submit" className="submit-button" >
                    SUBMIT
                    </button>
              
            </form>
            </div>
        </div>
    )
}

export default SignUpForm;
