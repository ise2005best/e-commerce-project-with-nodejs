const otpGenerator = require('otp-generator');

const OTP_LENGTH = 6
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
}
    const otp = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
   
module.exports = otp;