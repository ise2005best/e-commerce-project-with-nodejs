const express = require('express')
const router = express.Router();
const saltRoundsForBcrypt = 10;
const bcrypt = require('bcrypt');
const db = require('../config/db.config');
const Mails = require('../utils/handleEmail');
const addOtpToDB = require('../models/passwordReset.service')
router.post('/sign-up',(req,res)=>{
    const userPlainPassword = req.body.password;
    const userEmail = req.body.email;
    const userDisplayName = req.body.displayName
    bcrypt.hash(userPlainPassword, saltRoundsForBcrypt, (err, hash) => {
        if (err) {
            console.error(err)
        }
        else {
            const sql = "SELECT * FROM users WHERE `email` = ?";
            db.query(sql, [userEmail], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json("Error");
                }
                if (data.length > 0) {
                    return res.json("Email already exists");
                } else {
                    const insertSql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?, ?, ?)";
                    const values = [
                       userDisplayName, userEmail, hash,
                    ];
                    db.query(insertSql, values, (insertErr) => {
                        if (insertErr) {
                            console.error(insertErr);
                            return res.json('Email already exists');
                        } else {
                            
                            Mails.sendEmailVerification(userEmail);
                            return res.json('Success');
                        }
                    });
                }
            });
        }

    })
})
router.post('/sign-in',(req,res)=>{
    const userEmail = req.body.email;
    const userPlainPassword = req.body.password;

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
router.post('/forget-password', (req,res)=>{
    const userEmail = req.body.email;
    const checkEmailsql = "SELECT * FROM users WHERE `email` = ? ";
    db.query(checkEmailsql, [userEmail], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'An error occurred' })
        }
        if (data.length > 0) {
            addOtpToDB.handleOtpSubmission(userEmail)
            return res.json('ok')
        } else {
            return res.json("Email does not exists in our database")
        }
    })
})

module.exports = router