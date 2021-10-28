


const player = new Player();

function preload()
{

    
    
    player.nickname = Game.getNickname();

    Game.reloadScaleOfScreen();
}

function setup()
{
    createCanvas(Game.screenWidth,Game.screenHeight);
   
    angleMode(DEGREES);

    //server'a baglan
    Game.connectToServer(io);


    //SOCKET EVENTLERİ
    Game.socket.on('CLIENT_PLAYERS',function(data){
        Game.otherPlayers = data;
    });


    Game.socket.on('CLIENT_PLAYER-INFORMATION',function(data){
        Game.setPlayerInformation(data);
    });


    Game.socket.on('CLIENT_FIRE',function(fire){
        Game.addFire(fire);
    });

    
    Game.socket.on('CLIENT_GET-FIRE',function(player){
        Game.setPlayerInformation(player);
    });

    Game.socket.on('CLIENT_PUBLIC-MESSAGE',function(data){
        Game.addOutput(data.message);
    });


}


function draw()
{
    background('black');
    
    //keyboard.js
    keyboard();


    //çizilecek objeler game.js
    Game.drawPlayer();
    Game.drawOtherPlayers();
    Game.drawFires();

}

function windowResized()
{
    Game.reloadScaleOfScreen();
    resizeCanvas(Game.screenWidth,Game.screenHeight);
}