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
        leaveRoom: function() {
            this.socket.emit('leaveRoom', this.player.room);
        },
        playerIsInRoom: function(player_id,room_id){
            if(this.rooms[room_id].sockets.indexOf(player_id)!==-1){
                return false;
            } else {
                return true;
            }
        }
    },
    created: function() {
        this.socket.on('listRooms', (data) =>{
            this.rooms = data;
        });
        this.socket.on('playerJoinedRoom', (data) =>{
            this.player.room = data;
        });
        this.socket.on('playerLeavedRoom', () => {
            delete this.player.room;
        });
        this.socket.on('playerConnected', (data) =>{
            this.player.id = data;
        });        
    },
  })