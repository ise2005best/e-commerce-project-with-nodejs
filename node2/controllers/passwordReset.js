const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRoundsForBcrypt = 10;
const db = require('../config/db.config');
const addOtpToDb = require('../models/passwordReset.service')
router.post('/password-reset', (req, res) => {
    const otp = req.body.otp;
    const currentTimeUserInputedOtp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const checkOtpPassword = `SELECT * FROM password_reset WHERE otp = ? AND expired_at >= ? `;
    const values = [otp, currentTimeUserInputedOtp];
    db.query(checkOtpPassword, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.json('An error occurred')
        } else if (data.length > 0) {
            const userID = data[0].usersID
            const usersEmail = data[0].email
            const deleteOtpFromTable = 'UPDATE password_reset SET `otp` = NULL WHERE `usersID` = ?'
            db.query(deleteOtpFromTable, [userID], (err, data) => {
                if (err) {
                    console.log(err)
                    res.json("An error occurred")
                } if (data) {
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
            })

        }
        else {
            return res.json('Invalid otp')
        }
    })
})

router.post('/password-reset/resent-otp', (req, res) => {
    const userEmail = req.body.email;
    const getuserNameFromDB = 'SELECT NAME from users WHERE `email` = ?'
    db.query(getuserNameFromDB, [userEmail], (err, data) => {
        if (err) {
            console.log(err);
            res.json("An error occurred")
        } if (data) {
            const userDisplayName = data[0].Name;
            addOtpToDb.handleOtpSubmission(userEmail, userDisplayName);
            res.json('Succesful');
        }
        else {
            res.json("Error");
        }
    })


})
module.exports = router;