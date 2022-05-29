const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const mongoose = require('mongoose');
const signupController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const chatRoomController = require('./controllers/chatroomController');
const chatRoomMessageController = require('./controllers/chatroomMessageController');
const userDetailsController = require('./controllers/getUserDetailsController');
const announcementMessageController = require('./controllers/announcementMessageController');

const ChatRoomMessage = require('./models/chatroommessageModel');
const AnnouncementMessage = require('./models/announcementMessageModel');
const app = express();


app.use(bodyParser.json());
app.use(cors({ origin: '*'}));

var ExpressPeerServer = require("peer").ExpressPeerServer;    
var options = {
  debug: true,
  allow_discovery: true,
};
let peerServer = ExpressPeerServer(server, options);
app.use("/peerjs", peerServer);

app.get('/', (req, res) => {
    res.send("It's Working");
})

app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/chatRoom', chatRoomController);
app.use('/chatroomMessages', chatRoomMessageController);
app.use('/userDetails', userDetailsController);
app.use('/announcementMessages',announcementMessageController);

// var ExpressPeerServer = require("peer").ExpressPeerServer;    
// var options = {
//   debug: true,
//   allow_discovery: true,
// };
// let peerServer = ExpressPeerServer(server, options);
// app.use("/peerjs", peerServer);

const server = app.listen(process.env.PORT || 3000, () => console.log(`Server is running at ${process.env.PORT || 3000}`));

//const io = require('socket.io')(server);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})


io.use((socket, next) => {
    socket.id = socket.handshake.query.id;
    next();
});


io.on('connection', (socket) => {
    console.log("Connected: " + socket.id);

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.id);
    });

    socket.on("joinRoom", ({ chatRoomId, userId }) => {
        socket.join(chatRoomId);
        console.log(socket.id + " joined in: " + chatRoomId);
        //socket.broadcast.to(chatRoomId).emit('New User Joined ',{userid:userId,message:"Has joined this room"});
    })

    socket.on("leaveRoom", ({ chatRoomId }) => {
        socket.leave(chatRoomId);
        console.log("User left chatRoom: " + chatRoomId);
    })

    socket.on('chatroomMessage', (data) => {
        const ChatroomConversation = {
            chatroom: data.chatroom,
            user: data.user,
            message: data.message,
            name: data.name
        }

        const chatroommessage = new ChatRoomMessage(ChatroomConversation);
        chatroommessage.save((err, doc) => {
            if (err) {
                console.log(err);
            }
            else {
                io.in(data.chatroom).emit('chatroomMessage', data);
                console.log(data);
                console.log("Message Inserted");
            }
        })
    })

    socket.on('announcementMessage',(data) => {
        const announcementConversation = {
            user: data.user,
            message: data.message,
            name: data.name
        }
        const announcementMessage = new AnnouncementMessage(announcementConversation);
        announcementMessage.save((err,doc) =>{
            if(err) {
                console.log(err);
            }
            else{
                io.emit('announcementMessage',data);
                console.log("Announcement Message Inserted");
            }
        })
        
        
    })

    socket.on('video-call',(roomId,userId) => {
        socket.join(roomId);
        io.to(roomId).emit('user-connected',userId);
    })

    socket.on('videocall-disconnect',(roomId,userId) => {
        console.log('Room is '+ roomId);
        io.to(roomId).emit('user-disconnected',userId);
    })

    // socket.on("chatroomMessage",({chatroomId,message})=> {
    //     console.log(chatroomId + " " +message);
    //     if(message.trim().length > 0){
    //         io.to(chatroomId).emit("newMessage",{
    //             message:message,
    //             userId:socket.id
    //         });
    //         const obj = {
    //             chatroom: chatroomId,
    //             user:socket.id,
    //             message:message
    //         }
    //         const roomMessage = new ChatRoomMessage(obj);
    //         roomMessage.save((err,doc) => {
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 res.send(doc);
    //             }
    //         });
    //     }
    // })
})  