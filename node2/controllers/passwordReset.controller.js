const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRoundsForBcrypt = 10;
const db = require('../config/db.config');
const addOtpToDb = require('../models/passwordReset.service')
router.post('/password-reset', (req, res) => {
    const usersEmail = req.cookies.otpUserEmail
    const checkUserEmail = `SELECT * FROM users WHERE email = ?`
    db.query(checkUserEmail, [usersEmail], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("An error Occurred")
        } if (data.length > 0) {
            const usersNewPassword = req.body.newPassword;
            bcrypt.hash(usersNewPassword, saltRoundsForBcrypt, (err, hashedPassword) => {
                if (err) {
                    console.log(err)
                    res.json('An error occured')
                } else {
                    const updateUserPassword = `UPDATE users SET password = ? WHERE email = ?`
                    db.query(updateUserPassword, [hashedPassword, usersEmail], (err) => {
                        if (err) {
                            console.log(err)
                            return res.json('An error occurred updating user password')
                        } else {
                            return res.json('Succesful')
                        }
                    })
                }
            })

        }
    })
}
)
router.post('/password-reset/otp-confirmation', (req, res) => {
    const otp = req.body[0];
    const currentTimeUserInputedOtp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const checkOtpPassword = `SELECT * FROM password_reset WHERE otp = ? AND expired_at >= ? `;
    const values = [otp, currentTimeUserInputedOtp];
    db.query(checkOtpPassword, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.json('Invalid otp')
        } if (data) {
            const userID = data[0].resetID;
            const deleteOtpFromTable = 'UPDATE password_reset SET `otp` = NULL WHERE `usersID` = ?'
            db.query(deleteOtpFromTable, [userID], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.json("An error occurred")
                } if (data) {
                    return res.json("Successful")
                }
            })
        }
    })
})
router.post('/password-reset/resend-otp', (req, res) => {
    const userEmail = req.cookies.otpUserEmail;
    const checkForUserName = 'SELECT Name FROM users where `email` = ?'
    db.query(checkForUserName, [userEmail], (err, data) => {
        if (err) {
            res.json("An error occured")
        } if (data) {
            const userDisplayName = data[0].Name
            addOtpToDb.handleOtpSubmission(userEmail, userDisplayName)
            res.json('Successful')
        }
    })



})
module.exports = router;