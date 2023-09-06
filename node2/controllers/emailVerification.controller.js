const express = require('express');
const db = require('../config/db.config');
const router = express.Router();
router.post('/verify-email', (req,res)=>{
    const emailToken = req.body.emailToken;

    if(!emailToken){
        res.json("Email token not found")
    }
    db.query
})