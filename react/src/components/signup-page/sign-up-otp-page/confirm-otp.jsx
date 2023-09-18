import React, { useState, useEffect } from 'react';
import './OtpPage.css';
import { Link } from 'react-router-dom';

function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const socialMediaLinks = [
    //social media links , add more if needed 
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },

  ];

  useEffect(() => {
    handleResendClick();
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

  const handleResendClick = () => {
    // Simulate sending a new OTP here.
    // Reset the timer.
    setTimer(60);
    setIsResendDisabled(true);

  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;

    // Ensure input is a valid integer (between 0 and 9)
    if (/^[0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = parseInt(value, 10); // Convert the value to an integer
      setOtp(updatedOtp);

      // Move focus to the next input field if not the last one
      if (index < 5 && value !== '') {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === '' && index > 0) {
      // If the input is empty and it's not the first one, move focus to the previous input
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  const handleVerifyClick = () => {
    // Combine the OTP array into a single integer
    const enteredOtp = parseInt(otp.slice(0, 6).join(''), 10);
    // Check if the entered OTP is a 6-digit integer
    const isValidOtp = !isNaN(enteredOtp) && enteredOtp >= 100000 && enteredOtp <= 999999;
    if (isValidOtp) {
      // You can implement your OTP verification logic here
      console.log('Entered OTP:', enteredOtp);

      // Redirect or perform further actions after successful verification
    } else {
      // Display an error message or handle the case where the OTP is invalid
      console.log('Invalid OTP');
    }
  };

  return (
    <div className='main'>
      <div className="otp-container">
        <h2 style={{ fontWeight: "bolder", fontSize: "35px" }}>INPUT OTP</h2>
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
        <button onClick={handleVerifyClick} ><Link className='Link' to={"/thank-you-for-signing-up-with-us"}>Verify OTP</Link></button>
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

export default OTPPage;
