const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./../models/userModel');

router.post('/',(req,res) => {
    const email = req.body.email;

    const userData = req.body;
    const userDetails = new User(userData);

    const emailRegex = /@it.ssn.edu.in$/;

    if(!emailRegex.test(email)){
        res.status(400).send('Not a valid email');
    }
    else{
        User.findOne({email:email},(err,user)=>{
            if(user){
                res.status(400).send('User Already Registered');
            }
            else if(!user){
                userDetails.save((err,doc) => {
                    if(err) {
                        console.log(err);
                    }
                    else{
                        let payload = {subject:doc._id}
                        let token = jwt.sign(payload,'secretKey');
                        res.status(200).send({token});
                    }
                });
            }
        })
    }
});

module.exports = router;