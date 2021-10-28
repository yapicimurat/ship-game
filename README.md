# SHIP GAME

*You can play joyfully with your friends.
All of players against to each other.
There is **good effect** when you shot the enemy.*


## What to set to use
1. ship/client/index.html


## Change <YOUR_IP> with your IP
```
<script src="http://<YOUR_IP>:3000/socket.io/socket.io.js"></script>
```
2. ship/client/js/game.js
## Change <YOUR_IP> with your IP
```
static connectToServer(io)
{
    Game.socket = io.connect('http://<YOUR_IP>:3000');
    Game.socket.on('connect',function()
    {
        player.id = Game.socket.id;
        console.log(Game.socket.id);
        Game.reportNewLogin();
    });
}
```
## Setup to build project
1.There are dependencies in "ship/server/package.json"
You can install all of dependencies using by "npm install" command.
# Install dependencies
```
npm install
```
## Screenshot from the game
![Image](https://i.hizliresim.com/cz33iqx.gif)
