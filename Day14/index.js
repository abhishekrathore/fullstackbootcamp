const express = require('express');
const app  = express();
var http = require('http').Server(app);
var socket = require('socket.io')
var io = socket(http);
var fs  = require('fs');



app.use(express.static('public'));
app.get("/",function(req,res){
    res.send("hello");
})

io.on('connection', function(socket){
    console.log('a user connected');
    
    
    socket.on('chatmsg', function(msg){
        console.log('message: ' + msg);

        socket.broadcast.emit('chatsend',msg);

      });


  });

fs.readFile('dummy.txt','utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

http.listen(8080,function(){
    console.log("server started")
})