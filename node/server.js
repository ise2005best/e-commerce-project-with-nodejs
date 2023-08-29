const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'damilOlamide14$',
    database: 'e-commerce-project',
})

app.post('/sign-up', (req, res) => {
    const sql = "SELECT * FROM sign_up WHERE `email` = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }

        if (data.length > 0) {
            return res.json("Email already exists");
        } else {
            const insertSql = "INSERT INTO sign_up (`name`, `email`, `password`) VALUES (?, ?, ?)";
            const values = [
                req.body.displayName,
                req.body.email,
                req.body.password,
            ];
            
            db.query(insertSql, values, (insertErr) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.json('Error');
                } else {
                    return res.json('Success');
                }
            });
        }
    });
});

app.post('/sign-in', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password
    const checkEmailsql = "SELECT * FROM sign_up WHERE `email` = ? `password` = ?";
    db.query(checkEmailsql, [email, password], (error, data)=>{
        if(error){
            console.log(error)
            return res.json("Error")
        }if(data.length > 0){
            return res.json('Success')
        }
        else{
            console.log(error);
            return res.json('failed')
        }
        
    })
})

app.listen(8081, ()=>{
    console.log('listening on port 8081')
})
