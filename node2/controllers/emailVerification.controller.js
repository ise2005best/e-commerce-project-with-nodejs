const express = require('express');
const db = require('../config/db.config');
const router = express.Router();
router.post('/verify-email', (req,res)=>{
    const emailToken = req.body.emailToken;

    if(!emailToken){
        res.json("Email token not found")
    }
    const checkDbForUser = 'SELECT * FROM users where `token` = ?'
    db.query(checkDbForUser, [emailToken],(err,data)=>{
        if(err){
            console.log(err)
            console.log("Email token not found in db")
        }if(data.length > 0){
           const updateUserVerification = 'UPDATE users SET verified = 1, token = NULL WHERE email = ?'
           db.query(updateUserVerification, [data.length], (data,err)=>{
            
           })
        }
    })
})