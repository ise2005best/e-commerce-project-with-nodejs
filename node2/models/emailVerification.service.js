const db = require ('../config/db.config');
const sendEmailVerification = require ('../utils/handleEmail')
const handleEmailVerification = async (userEmail, userDisplayName, otp) =>{
        const currentTime = new Date();
        var expiredTime = new Date(currentTime.getTime() + 60 * 60 * 1000) // one hour after current time
        const searchForUsersId = 'SELECT usersID FROM users WHERE `email` = ? ';
        db.query(searchForUsersId, [userEmail], (err,data)=>{
            if(err){
                console.log(err)
            }
            if(data.length > 0){
                const userID = data[0].usersID
                const values = [userID , otp, currentTime, expiredTime];
                const insertStringInDB = 'INSERT INTO usersVerification (`usersID`,`otp`, `created_at` , `expired_at`) VALUES (?, ?, ?, ?)'
                 db.query(insertStringInDB, values, (err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        sendEmailVerification.sendEmailVerification(userEmail, userDisplayName, otp)
                    }
                 })
            }
        })
    
}
module.exports = handleEmailVerification
// module.exports = urlToBeClicked