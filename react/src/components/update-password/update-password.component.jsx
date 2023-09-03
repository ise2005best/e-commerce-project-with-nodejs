import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import './update-password.styles.scss'; // Import your CSS file

const UpdatePassword = () => {
    const navigate = useNavigate();
    const initialFields = {
        newPassword: '',
        confirmNewPassword: '',
        otp: ''
    }
    const [fields, setFields] = useState(initialFields);
    const { newPassword, confirmNewPassword, otp } = fields;
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const submitNewPassword = async (event) => {
        event.preventDefault();

        if (passwordValid) {
           const response = await  axios.post('http://localhost:8002/password-reset', fields)
                try{
                    if(response.data === 'Succesful'){
                        navigate('/sign-in')
                    }else if (response.data === 'Invalid otp'){
                        setErrorMessages('Invalid OTP');
                    }else{
                        console.log(response.data)
                        setErrorMessages('An error occurred')
                    }
                }catch(err){
                    console.log(err)
                }
        } else {
            setErrorMessages("Password does not meet the criteria.");
        }
    }

    return (
        <div style={{ backgroundColor: "#1D2743", padding: "40px" }}>
            <div className="update-password-container">
                <h2 className="header">UPDATE PASSWORD</h2>
                <form onSubmit={submitNewPassword}>
                    <div className="text-fields">
                        <label>OTP</label>
                        <input
                            required
                            type='text'
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            className="sign-in-text"
                        />
                        <label>New Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                name="newPassword"
                                value={newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                className="sign-in-text"
                            />
                            <Icon
                                className="eye-icon"
                                icon={showPassword ? eyeOff : eye}
                                onClick={togglePassword}
                            />
                        </div>
                        <label>Confirm New Password</label>
                        <input
                            required
                            type="password"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            className="sign-in-text"
                        />
                    </div>
                    <div className="password-check-list-container">
                        <PasswordChecklist
                            className="password-check-list"
                            rules={['minLength', 'specialChar', 'capital', 'number', 'match']}
                            minLength={8}
                            value={newPassword}
                            valueAgain={confirmNewPassword}
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
                    <button type='submit' className="submit-button">
                        Update New Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword;