const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-venkatesh:venkatesh2000@cluster0.crogf.mongodb.net/ChatApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} , async(err) => {
    if(!err){
        console.log("MongoDb Atlas Connected");
    }
    else{
        await console.log('Error while connecting' + err);
    }
});

