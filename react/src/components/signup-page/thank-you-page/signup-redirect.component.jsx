import { useState } from "react";
import InstagramIcon from '../../../static/instagram.png';
import TwitterIcon from '../../../static/twitter.png';
import WhatsappIcon from '../../../static/whatsapp.png';
import Email from "../../../static/cake.gif"
import './signup-redirect.styles.scss';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const RedirectSignUp = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');
    const [otp, setOtp] = useState('');
    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await axios.post('http://localhost:8002/verify-email', otp)
        if(response.data === 'Successful'){
            navigate('/')
        }else if (response.data === 'Invalid otp'){
            setErrorMessages('Invalid otp')
        }else{
            setErrorMessages('An error occurred')
        }
    }
    const resendOtp = async()=>{
        const response = await axios.post('http://localhost:8002/verify-email/resend-otp', otp)
        try{
            if(response.data ==='Succesful'){
                setErrorMessages("Otp resent")
            }else{
                setErrorMessages("An error occurred")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div style={{ backgroundColor: "#1d2743" }}>
            <div className="container">
                <div className="confirm-email-container">
                    <div className="email-image-container">
                        <img src={Email}
                            alt="email verifications"
                            className="email-image" />
                    </div>
                    <h1 className="major-text">
                        Thank you for signing up with ISESEN
                    </h1>
                    <p className="error-message"> {errorMessages}</p>
                    {/* <form onSubmit={handleSubmit}>
                        <label> Enter Otp </label>
                        <input
                            placeholder="Otp"
                            value={otp}
                            type='number'
                            name="otp"
                            required
                            onChange={handleOtpChange}
                            className="input" />
                        <button type='submit' className="button">
                            Submit
                        </button>
                    </form>
                        <Link className="forget-password-button" onClick={resendOtp} >
                        Forget Password
                        </Link> */}
                    <div className="icons">
                        <img src={WhatsappIcon}
                            alt="whatsapp-icon"
                            className="little-icon" />
                        <img src={InstagramIcon}
                            alt="instagram-icon"
                            className="little-icon" />
                        <img src={TwitterIcon}
                            alt="twitter-icon"
                            className="little-icon" />
                    </div>
                </div>
                <div className="bottom-page">

                    <div className="copyright-text">
                        <p>
                            © Copyrights 2023, ISESEN
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedirectSignUp;