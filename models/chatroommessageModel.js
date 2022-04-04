const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatroom:{
        type:mongoose.Schema.Types.ObjectId, ref:"chatroom"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"user"
    },
    message:{
        type: String
    },
    name:{
        type:String
    }
});

module.exports = mongoose.model('message',messageSchema);