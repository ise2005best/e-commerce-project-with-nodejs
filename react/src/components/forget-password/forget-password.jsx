import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./forgot-password.scss"
const ForgetPassword = ()=>{
const [email, setEmail] = useState('')
const [errorMessages, setErrorMessages] = useState('');
const navigate = useNavigate()
localStorage.setItem('usersEmail', email)


const handleEmailChange = (event) =>{
    setEmail(event.target.value);
}

const handleSubmit = async (event)=>{
    event.preventDefault()
    try {
        const response =  await axios.post('http://localhost:8002/forget-password',{email}, {withCredentials: true})

        if(response.data === "Email does not exists in our database"){
            setErrorMessages('Email does not exists in our database')
        }
        if(response.data === "ok"){
            navigate('/reset-password/reset-otp')
        }else{
            setErrorMessages("An error occurred. Please try again later")
        }
    } catch (error) {
        console.error(error);
        setErrorMessages('An error occurred. Please try again later.');
    }
   
}


return (
   <div className="main">
        <div className="container">
            <h2 className="title">
                Forget Password
            </h2>
            <span>
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