const express = require('express');
const verifyToken = require('../middleware');
const router = express.Router();
const announcementMessage = require('./../models/announcementMessageModel');

router.get('/',verifyToken,(req,res) =>{
    announcementMessage.find((err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

module.exports = router;