const express = require("express");
const socket = require("socket.io");
//const uuid = require('uuid')
const {nanoid} = require('nanoid');
const _ = require('lodash');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT);

const rooms = {}

const createRoom = function(socket){
  let room = {
    id:nanoid(8),
    sockets:[]
  };
  rooms[room.id] = room;
  joinRoom(room.id, socket);
  socket.emit('listRooms', rooms);  
};

const joinRoom = function(room_id, socket){
  rooms[room_id]['sockets'].push(socket.id);
  socket.room_id = room_id;
  socket.join(room_id);
  console.log(`${socket.id} joined on ${room_id}`);
  socket.emit('playerJoinedRoom', room_id);
};

const leaveRoom = function(room_id, socket_id){
  if(room_id!=undefined){
    _.pull(rooms[room_id].sockets,socket_id);
    if(rooms[room_id].sockets.length==0){
      delete rooms[room_id];
      console.log(`${room_id} deleted`);
    }
    console.log(rooms);
  }
}
// Static files
app.use(express.static("public"));

// api routes
app.get('/api', function(req, res){
  res.json({resp:'asdfasdf'})
})

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  socket.emit('playerConnected', socket.id);
  socket.emit('listRooms',rooms);
  console.log(`${socket.id} has connected`);

  socket.on('disconnect', (data) => {
    leaveRoom(socket.room_id,socket.id);
    console.log(`${socket.id} has disconnected`);
  });

  socket.on('createRoom', function(){
    createRoom(socket);
  });

  socket.on('joinRoom', function(data){
    joinRoom(data,socket);
  });
});