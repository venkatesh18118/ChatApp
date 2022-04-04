const express = require('express');
const verifyToken = require('../middleware');
const router = express.Router();
const ChatroomMessage = require('../models/chatroommessageModel');

router.get('/:id',verifyToken,(req,res) =>{
    const chatRoom = req.params.id;
    ChatroomMessage.find({chatroom:chatRoom},(err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

module.exports = router;