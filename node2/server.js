const express = require('express'); 
const app = express(); 
const port = 8002;
const UserRouter = require('./controllers/user.controller')
const passwordResetRouter = require('./controllers/passwordReset.controller')
const emailVerification = require('./controllers/emailVerification.controller')
app.use(express.json())
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({origin:true,credentials:true})); // cridentials are set to true to allow cookies to be accepted on the client side
app.use(cookieParser());
app.use(UserRouter);
app.use(passwordResetRouter);
app.use(emailVerification);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
