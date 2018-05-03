const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);
var counter = 0;
    
io.on('connection', function (socket) { //2
  
    socket.on('count_add',function(){
      console.log('test');
      counter+=1
      console.log(counter);
      socket.emit('counter',{response:counter});
    });

    io.emit('newuser', {counter:counter});
   
    socket.on('reset', function() {
      console.log("restting the thing...")
      counter = 0;
    socket.emit('reset_count', {counter:counter});
    });
   
  });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});