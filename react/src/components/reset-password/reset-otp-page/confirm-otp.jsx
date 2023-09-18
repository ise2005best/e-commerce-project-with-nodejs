import React, { useState, useEffect } from 'react';
import './OtpPage.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState('');
  const usersEmail = localStorage.getItem('usersEmail')
  const socialMediaLinks = [
    //social media links , add more if needed 
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },

  ];

  useEffect(() => {
    setTimer(60);
    setIsResendDisabled(true);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setIsResendDisabled(false);
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const handleResendClick = async () => {
    setTimer(60);
    setIsResendDisabled(true);
    const response = await axios.post('http://localhost:8002/password-reset/resend-otp', undefined, { withCredentials: true })
    if (response.data === 'Successful') {
      toast.success(`New OTP sent to ${usersEmail}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      setErrorMessages('An error occurred')
    }
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;

    // Ensure input is numeric and limit length to 1 character
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move focus to the next input field if not the last one
      if (index < 5 && value !== '') {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleVerifyClick = async() => {
    const enteredOtp = otp.join('');
    const response = await axios.post('http://localhost:8002/password-reset/otp-confirmation', [enteredOtp], { withCredentials: true })
    if (response.data === 'Successful') {
      navigate('/reset-password')
    } else {
      setErrorMessages('Invalid otp')
    }
  };


  return (
    <div className='main'>
      <div className="otp-container">
        <h2 style={{ fontWeight: "bolder", fontSize: "35px" }}>INPUT OTP</h2>
        <p>An otp has been sent to {usersEmail}  </p>
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(event) => handleInputChange(event, index)}
            />
          ))}
        </div>
        <p>{errorMessages}</p>
        <button onClick={handleVerifyClick} ><Link className='Link' to={"/reset-password"}>Verify OTP</Link></button>
        <div className="timer">{`${Math.floor(timer / 60)}:${(timer % 60)
          .toString()
          .padStart(2, '0')}`}</div>
        <p>
          Didn't receive the OTP?{' '}

          <span
            className={`resend-link ${isResendDisabled ? 'disabled' : ''}`}
            onClick={isResendDisabled ? undefined : handleResendClick}
            style={isResendDisabled ? { cursor: 'default' } : { cursor: 'pointer' }}
          >
            <p style={{ justifyItems: "center", alignItems: "center", paddingLeft: "38px" }}>Resend OTP</p>
          </span>
        </p>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />

        <div className="social-media">
          {socialMediaLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-icon"
            >
              <i className={`fa fa-${link.name.toLowerCase()}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
