module.exports = class Game
{

    static gameTime = 0;

    static players = [];

    static welcomeText = "SERVER: Hoşgeldin Gardaşş.... \n www.yazilimruhu.com";

    static addPlayer(player)
    {
        Game.players.push(player);
    }

    static setPlayer(player)
    {
        for(let i = 0;i < Game.players.length;i++)
        {
            if(player.id == Game.players[i].id)
            {
                Game.players[i] = player;
                break;
            }
        }
    }

    static removePlayer(id)
    {
        for(let i = 0;i < Game.players.length;i++)
        {
            if(Game.players[i].id == id)
            {
                Game.players.splice(i,1);
                break;
            }
        }

    }


    static getNicknameWithID(id)
    {
        let nickname = "";
        for(let i = 0;i < Game.players.length;i++)
        {
            let player = Game.players[i];
            if(player.id == id)
            {
                nickname = player.nickname;
                break;
            }

        }

        return nickname;
    }




}