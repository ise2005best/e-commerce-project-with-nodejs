const jwt = require('jsonwebtoken')
require('dotenv').config()
const crypto = require('crypto')
const db = require ('../config/db.config');
const sendEmailVerification = require ('../utils/handleEmail')

const uniqueString = crypto.randomBytes(64).toString('hex');

const createToken = (_id) =>{
    const jwtSecretKey = process.env.JWT_SECRET
    return jwt.sign({_id}, jwtSecretKey, {expiresIn: '3d'})
}

const handleEmailVerification = async (userEmail, userDisplayName) =>{
        const currentTime = new Date();
        var expiredTime = new Date(currentTime.getTime() + 60 * 60 * 1000) // one hour after current time
        const values = [uniqueString, currentTime, expiredTime];
        const insertStringInDB = 'INSERT INTO users (`token`, `created_at` , `expires_at`) VALUES (?, ?, ? )'
         db.query(insertStringInDB, values, (err)=>{
            if(err){
                console.log(err)
            }
            else{
               
                sendEmailVerification.sendEmailVerification(userEmail, userDisplayName)
            }
         })
    
}
module.exports = handleEmailVerification
// module.exports = urlToBeClicked