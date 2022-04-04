const mongoose = require('mongoose');

const announcementMessageSchema = new mongoose.Schema({
    
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

module.exports = mongoose.model('announcementMessage',announcementMessageSchema);