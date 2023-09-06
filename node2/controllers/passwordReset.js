const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRoundsForBcrypt = 10;
const db = require('../config/db.config');
router.post('/password-reset',(req,res)=>{
    const otp = req.body.otp;
    const currentTimeUserInputedOtp = new Date().toISOString().slice(0,19).replace('T', ' ');
    const checkOtpPassword = `SELECT * FROM password_reset WHERE otp = ? AND expired_at >= ? `;
    const values = [otp, currentTimeUserInputedOtp];
    db.query(checkOtpPassword, values, (err,data) =>{
         if(err){
            console.log(err)
           return res.json('An error occurred')
        }else if(data.length > 0){
            const usersEmail = data[0].email
            const checkUserEmail = `SELECT * FROM users WHERE email = ?`
            db.query(checkUserEmail, [usersEmail], (err,data)=>{
                if(err){
                    console.log(err)
                    return res.json("An error Occurred")
                } if(data.length > 0){
                    const usersNewPassword = req.body.newPassword;
                    bcrypt.hash(usersNewPassword, saltRoundsForBcrypt,(err, hashedPassword)=>{
                        if(err){
                            console.log(err)
                            res.json('An error occured')
                        }else{
                            const updateUserPassword = `UPDATE users SET password = ? WHERE email = ?`
                            db.query(updateUserPassword, [hashedPassword, usersEmail], (err)=>{
                                if(err){
                                    console.log(err)
                                    return res.json('An error occurred updating user password')
                                }else{
                                    return res.json('Succesful')
                                }
                            })
                        }
                    })
                   
                }
            })
        }
        else{
          return res.json('Invalid otp')
         }
    })
})

router.post('/resend-otp', (req, res)=>{
    
})
module.exports = router;