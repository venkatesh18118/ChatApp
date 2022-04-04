const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./../models/userModel');

router.post('/',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}, (err,user) => {
        if(err){
            console.log(err);
        }
        if(!user){
            res.status(401).send('Invalid Email');
        }
        else if(password !== user.password){
            res.status(401).send('Invalid Password');
        }
        else{
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
        }
    })
})

module.exports = router;