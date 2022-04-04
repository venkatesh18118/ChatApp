const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name:{
        type:String
    },
    year:{
        type:String
    },
    section:{
        type:String
    }
});

module.exports = mongoose.model('chatroom',chatRoomSchema);