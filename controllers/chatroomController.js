const express = require('express');
const verifyToken = require('../middleware');
const router = express.Router();
const ChatRoom = require('./../models/chatroomModel');

router.post('/',(req,res) => {
    const name = req.body.name;
    const room = req.body;
    const chatRoomDetails = new ChatRoom(room);
    ChatRoom.findOne({name:name}, (err,room) => {
        if(err){
            console.log(err);
        }
        if(room){
            res.status(401).send('The room name is already exists');
        }
        else{
            chatRoomDetails.save((err,doc) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(doc);
                }
            })
        }
    })
})

router.get('/',(req,res) => {
    ChatRoom.find((err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

router.get('/:id',async (req,res) => {
    const chatRoom = req.params.id;
    ChatRoom.find({_id:chatRoom},(err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

router.delete('/:id', async (req,res) => {
    const chatRoomDetails = await ChatRoom.findByIdAndRemove(req.params.id);
    if(chatRoomDetails){
        res.status(200).send(chatRoomDetails);
    }
    else{
        console.log("Error");
    }
})
module.exports = router;