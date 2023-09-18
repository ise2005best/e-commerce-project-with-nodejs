const express = require('express');
const db = require('../config/db.config');
const handleEmail = require('../models/emailVerification.service');
const otp = require('../utils/handleOtp');

const router = express.Router();
router.post('/verify-email', (req, res) => {
    const currentTimeUserInputedOtp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const otp = req.body[0];
    const checkuserOtpInDB = 'SELECT * FROM usersVerification WHERE `otp` = ? AND `expired_at` >= ? '
    const values = [otp, currentTimeUserInputedOtp]
    db.query(checkuserOtpInDB, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Invalid otp")
        } if (data.length > 0) {
            const usersID = data[0].usersID
            const updateUsersTable = 'UPDATE users SET `verified` = 1 WHERE `usersID` = ? '
            db.query(updateUsersTable, [usersID], (err, data) => {
                if (err) {
                    console.log(err);
                    res.json("An error occurred")
                } if (data) {
                    const deleteOtpFromTable = 'UPDATE usersVerification SET `otp` = NULL WHERE `usersID` = ?'
                    db.query(deleteOtpFromTable, [usersID], (err, data) => {
                        if (err) {
                            console.log(err)
                           return res.json("An error occurred")
                        } if (data) {
                            return res.json("Successful");
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

router.post('/verify-email/resend-otp', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const usersEmail = req.cookies.usersEmail
    const usersDisplayName = req.cookies.usersDisplayName
    handleEmail(usersEmail, usersDisplayName, otp)
   return res.json("Successful")
})
module.exports = router;