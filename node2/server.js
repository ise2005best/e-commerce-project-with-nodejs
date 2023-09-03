const express = require('express'); 
const app = express(); 
const port = 8002;
const UserRouter = require('./controllers/user')
const passwordResetRouter = require('./controllers/passwordReset')
app.use(express.json())
const cors = require('cors');
app.use(cors());
app.use(UserRouter);
app.use(passwordResetRouter);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
