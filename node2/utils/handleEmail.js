const nodeMailer = require('nodemailer');
require('dotenv').config();
const otp = require('../utils/handleOtp')
const MAIL_SETTINGS = {
    host: "sandbox.smtp.mailtrap.io" ,
    port: 2525,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
}
const transporter = nodeMailer.createTransport(MAIL_SETTINGS);
module.exports.sendOtpMail = async (email) => {
    try {
        let passwordResetInformation = await transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: email,
            subject: 'Reset password',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=El+Messiri&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'El Messiri', sans-serif; background-color: #1D2743; padding-top: 100px;">
                <div style="font-family: 'Tilt Prism', sans-serif; font-size: 55px; color: #FE9000; text-align: center; margin-bottom: 30px;">ISESEN</div>
                <div style="max-width: 600px; margin: auto; padding: 20px 40px; background-color: #F5FBEF; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; font-size: 30px;">Email Verification</h1>
                    <p style="line-height: 7px;">Hello ,</p>
                    <p >We received a request to reset your password. Please use the following one-time password (OTP) to verify your email and reset your password:</p>
                    <p style=" line-height: 7px; font-size: 18px; font-weight: bold; color: #1D2743;">${otp}</p>
                    <p style=" line-height: 7px;" you did not request a password reset, you can safely ignore this email.</p>
                    <p>Thank you,</p>
                    <p style=" line-height: 7px;">ISESEN</p>
                    <hr style="border: none; border-top: 1px solid #FE9000; margin: 20px 0;">
                    <div style="font-size: 13px; color: #FE9000; line-height: 7px;">
                        For any assistance, please email: <a style="color: #FE9000; text-decoration: none;">assistance@example.com</a>
                    </div>
                    <p style="font-size: 10px; color: #666; line-height: 7px;">&copy; 2023 ISESEN. All rights reserved.</p>
                    <p style="font-size: 10px; color: #666; line-height: 7px;">Terms and Conditions</p>
                    <p style="font-size: 10px; line-height: 7px;">123 Main Street, City, Country</p>
                </div>
            </body>
            </html>`
        });
        return passwordResetInformation;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.sendEmailVerification = async (email,urlToBeClicked) => {
    try {
        let emailVerification = await transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: email,
            subject: 'Email Confirmation',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to ISESEN</title>
                <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=El+Messiri&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'El Messiri', sans-serif; background-color: #1D2743; padding-top: 100px;">
                <div style="font-family: 'Tilt Prism', sans-serif; font-size: 55px; color: #FE9000; text-align: center; margin-bottom: 30px;">ISESEN</div>
                <div style="max-width: 600px; margin: auto; padding: 20px 40px; background-color: #F5FBEF; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; font-size: 30px;">Welcome to ISESEN!</h1>
                    <p>Congratulations !</p>
                    <p style="line-height: 18px;">You have successfully signed up with ISESEN. We are excited to have you as a member of our community.</p>
                    <p style="line-height: 17px;">Enjoy shopping with us and exploring our wide range of products.<p >Thank you for choosing ISESEN for your shopping needs.</p></p>
                    <a href= <${urlToBeClicked}> Link </a>
                    <p style="line-height: 7px;">Happy shopping!</p>
                    <hr style="border: none; border-top: 1px solid #FE9000; margin: 20px 0;">
                    <div style="font-size: 13px; color: #FE9000; line-height: 15px;">
                        For any assistance, please email: <a style="color: #FE9000; text-decoration: none;">assistance@example.com</a>
                    </div>
                    <p style="font-size: 10px; color: #666; line-height: 7px;">&copy; 2023 ISESEN. All rights reserved.</p>
                    <p style="font-size: 10px; color: #666; line-height: 7px;">Terms and Conditions</p>
                    <p style="font-size: 10px; line-height: 7px;">123 Main Street, Lagos, Nigeria</p>
                </div>
            </body>
            </html>`
        });
        return emailVerification;
    }
    catch (error) {
        console.log(error);
    }
}