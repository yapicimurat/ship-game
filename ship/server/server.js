const http = require('http').createServer().listen(3000,function(){
    console.log("http server 3000 portundan dinleniyor....");
});
const io = require('socket.io')(http,{
    cors: {
        origin: "*"
      }
});


const Player = require('./player');
const Game = require('./game');






io.on('connection',function(socket){
    console.log(`Server'a yeni client bağlandı => ${socket.id}`);


    socket.on('SERVER_NEW-USER-LOGIN',function(data){
        let player = new Player();

        player.id = socket.id;
        player.nickname = data.nickname;
        player.health = data.health;
        player.gunType = data.gunType;
        player.position = data.position;
        player.angle = data.angle;
        player.color = data.color;
        player.R = data.R;
        Game.addPlayer(player);

        socket.broadcast.emit('CLIENT_PLAYERS',Game.players);
        socket.emit('CLIENT_PLAYERS',Game.players);

        socket.broadcast.emit('CLIENT_PUBLIC-MESSAGE',{
            message: `${player.nickname} oyuna giriş yaptı.`
        });
        socket.emit('CLIENT_PUBLIC-MESSAGE',{
            message: `${player.nickname} oyuna giriş yaptı.`
        });
    });

    socket.on('SERVER_PLAYER-INFORMATION',function(data){
        Game.setPlayer(data);
        socket.broadcast.emit('CLIENT_PLAYER-INFORMATION',data);
    }); 
    

    socket.on('SERVER_FIRE',function(fire){

        socket.broadcast.emit('CLIENT_FIRE',fire);


    });

    socket.on('SERVER_GET-FIRE',function(data){
        Game.setPlayer(data.player);
        /*
            mermi yeme raporu yapan kullanıcı yediği mermi sonucunda öldüyse
            oyun ekranlarına duyuru yap
        */
        if(data.player.isDead)
        {
            //diger clientler
            socket.broadcast.emit('CLIENT_PUBLIC-MESSAGE',{
                message: `${data.player.nickname}, ${Game.getNicknameWithID(data.fire.fireOwnerID)} tarafından öldürüldü.`
            });
            //gonderen client
            socket.emit('CLIENT_PUBLIC-MESSAGE',{
                message: `${data.player.nickname}, ${Game.getNicknameWithID(data.fire.fireOwnerID)} tarafından öldürüldü.`
            });
        }
        socket.broadcast.emit('CLIENT_GET-FIRE',data.player);
    });


    socket.on('disconnect',function(){
        
        socket.broadcast.emit('CLIENT_PUBLIC-MESSAGE',{
            message: `${Game.getNicknameWithID(socket.id)} oyundan ayrıldı.`
        });
        Game.removePlayer(socket.id);
        socket.broadcast.emit('CLIENT_PLAYERS',Game.players);
        console.log(`Server'dan ayrıldı => ${socket.id}`);
    });

});