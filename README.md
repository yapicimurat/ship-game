# 2D SHIP GAME
Simple 2D HTML Canvas game in JavaScript
##### Frameworks
[p5.js](https://p5js.org/)
[socket.io](https://socket.io/)
## What to set to use
##### 1.Go to  `ship/client/index.html`

##### Change <YOUR_IP> with your IP

``` html
<script src="http://<YOUR_IP>:3000/socket.io/socket.io.js"></script>
```
##### 2.Go to  `ship/client/game.js`
##### Change <YOUR_IP> with your IP
``` js
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
##### * There are two dependencies in "ship/server/package.json"
You should install all of dependencies using by `npm install` command.
## Screenshot from the game
![Image](https://i.hizliresim.com/cz33iqx.gif)
