const express = require('express');
const router = express.Router();
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

router.get('/:id',(req,res) => {
    const token = req.params.id;
    let payload = jwt.verify(token,'secretKey');
    const params = payload.subject;
    User.findOne({_id:params},(err,user) => {
        if(err){
            console.log(err);
            
        }
        if(!user){
            res.status(401).send('Un Authorized User');
        }
        else{
            res.send(user);
        }
    })
})

module.exports = router;