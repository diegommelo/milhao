//const socket = io();

var app = new Vue({
    el: '#app',
    data: {
      room_id:'',
      socket: io(),
      rooms:[],
      player:{}
    },
    methods: {
        joinRoom: function(room_id) {
            this.socket.emit('joinRoom', room_id);
        },
        createRoom: function(e){
            this.socket.emit('createRoom');
            e.preventDefault();
        },
        listRooms: function(){
            this.socket.emit('listRooms');
        },
        leaveRoom: function(room_id) {
            this.socket.emit('leaveRoom', room_id);
        }
    },
    created: function() {
        this.socket.on('listRooms', (data) =>{
            this.rooms = data;
        });
        this.socket.on('playerJoinedRoom', (data) =>{
            this.player.room = data;
        });
        this.socket.on('playerLeavedRoom', (data) => {
            console.log('saiu');
        });
        this.socket.on('playerConnected', (data) =>{
            this.player.id = data;
        });        
    },
  })