import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    return(
        <div>
            <h2>
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
        value={email}
        required
        onChange={handleEmailChange}
        />
        <p>{errorMessages}</p>
        <button type="submit">
            Submit
        </button>
            </form>
        </div>
    )
}
export default ForgetPassword;