const express = require('express')
const router = express.Router();
const saltRoundsForBcrypt = 10;
const bcrypt = require('bcrypt');
const db = require('../config/db.config');
const handleOtp = require('../models/emailVerification.service')
const addOtpToDB = require('../models/passwordReset.service');
const otp = require('../utils/handleOtp');
router.post('/sign-up', (req, res) => {
    const userPlainPassword = req.body.password;
    const userEmail = req.body.email;
    const userFirstName =  req.body.firstName;
    const userLastName = req.body.lastName;
    res.cookie('usersEmail', userEmail, {maxAge: 10000000, httpOnly: false});
    res.cookie('usersFirstName', userFirstName,  {maxAge: 10000000, httpOnly: false});
    res.cookie('usersLastName', userLastName,  {maxAge: 10000000, httpOnly: false});
    bcrypt.hash(userPlainPassword, saltRoundsForBcrypt, (err, hash) => {
        if (err) {
            res.json('Error hashing password')
        }
        else {
            const sql = "SELECT * FROM users WHERE `email` = ?";
            db.query(sql, [userEmail], (err, data) => {
                if (err) {
                    console.log(err);
                }
                if (data.length > 0) {
                    res.json("Email already exists");
                } else {
                    const insertSql = "INSERT INTO users (`firstName`, `lastName`, `email`, `password`, `verified`) VALUES (?, ?, ?, ?, ?)";
                    const values = [
                        userFirstName, userLastName, userEmail, hash, 0,
                    ];
                    db.query(insertSql, values, (insertErr) => {
                        if (insertErr) {
                            console.error(insertErr);
                        }
                        else {
                           handleOtp(userEmail, userLastName, otp);                          
                            res.json('Success');
                        }
                    });
                }
            });
        }

    })
})
router.post('/sign-in', (req, res) => {
    const userEmail = req.body.email;
    const userPlainPassword = req.body.password;
    res.cookie('otpUserEmail', userEmail, {maxAge: 10000000, httpOnly: true});
    const checkEmailsql = "SELECT * FROM users WHERE `email` = ? ";
    db.query(checkEmailsql, [userEmail], (error, data) => {
        if (error) {
            console.log(error)
        } if (data.length > 0) {
            bcrypt.compare(userPlainPassword, data[0].password, (err, response) => {
                if (err) {
                    console.log(err)
                    return res.json("Error")
                }
                if (response) {
                    return res.json('Success')
                } else {
                    return res.json("Incorrect password")
                }
            });
        }
        else {
            return res.json('User not found')
        }
    })
})
router.post('/forget-password', (req, res) => {
    const userEmail = req.body.email;
    res.cookie('otpUserEmail', userEmail, {maxAge: 10000000, httpOnly: true})
    const getuserFirstName = "SELECT firstName FROM users WHERE `email` = ?"
    db.query(getuserFirstName, [userEmail], (err, data) => {
        if (err) {
            console.log(err)
            res.json("An error occurred")
        } if (data.length > 0) {
            const userFirstName = data[0].firstName;
            const userLastName = data[0].lastName
            res.cookie('usersFirstName', userFirstName)
            res.cookie('usersLastName', userLastName )
            const checkEmailsql = "SELECT * FROM users WHERE `email` = ? ";
            db.query(checkEmailsql, [userEmail], (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An error occurred' })
                }
                if (data.length > 0) {
                    addOtpToDB.handleOtpSubmission(userEmail,userFirstName)
                    return res.json('ok')
                } 
            })
        }else {
            return res.json("Email does not exists in our database")
        }
    })

})

module.exports = router