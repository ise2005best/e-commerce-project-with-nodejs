const otp = require ('../utils/handleOtp');
const db = require('../config/db.config');
const sendOtpEmail = require('../utils/handleEmail')

const currentTime = new Date();
var expiredTime = new Date(currentTime.getTime() + 5 * 60 * 1000) // 5 minutes after current time
module.exports.handleOtpSubmission = async (userEmail) => {
    const values = [
        otp, userEmail, currentTime, expiredTime
  ]
    const addOTPToDatabase = "INSERT INTO password_reset (`otp`, `email`, `created_at`, `expired_at`) VALUES (?)";
    db.query(addOTPToDatabase, [values],  (err) => {
        if (err) {
            console.log(err)
        } else {
            sendOtpEmail.sendOtpMail(userEmail);
        }
    })
}