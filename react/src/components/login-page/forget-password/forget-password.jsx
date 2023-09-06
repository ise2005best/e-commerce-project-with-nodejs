import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './forgot-password.scss'
const ForgetPassword = ()=>{
const [email, setEmail] = useState('')
const [errorMessages, setErrorMessages] = useState('');
const handleEmailChange = (event) =>{
    setEmail(event.target.value);
}
const navigate = useNavigate()
const handleSubmit =(event)=>{
    event.preventDefault()
    axios.post('http://localhost:8002/forget-password',{email: email } )
    .then(res=>{
        if(res.data === "Email does not exists in our database"){
            setErrorMessages('Email does not exists in our database')
        }
        if(res.data === "ok"){
            navigate('/reset-password')
        }
    })
}
return (
    <div style={{ backgroundColor: '#1D2743', padding: '270px 0px' }}>
        <div className="main-container">
            <h2 className="title">
                Forget Password
            </h2>
            <span className="body">
                Please input your email to reset your password
            </span>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    className="input"
                    value={email}
                    required
                    onChange={handleEmailChange}
                />
                <p>{errorMessages}</p>
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    </div>
)
}
export default ForgetPassword;