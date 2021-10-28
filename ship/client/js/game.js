class Game
{
    static gameTime = 300;

    static socket = null;

    static screenWidth = 0;
    static screenHeight = 0;


    static centerOfWidth = 0;
    static centerOfHeight = 0;

    static OUTPUT_TYPES = {
        GAME_TIME: 0,
        USER_COUNT: 1,
        KILL_USER: 2,
        LOGIN_USER: 3,
        LOGOUT_USER: 4
    };

    static connectToServer(io)
    {
        Game.socket = io.connect('http://192.168.10.83:3000');
        

        //server'a baglandiginda gerekli islemleri yapabilirim
        Game.socket.on('connect',function()
        {
            player.id = Game.socket.id;
            console.log(Game.socket.id);
            Game.reportNewLogin();
        });
        
        
    }

    static drawPlayer()
    {
        //player.js
        player.draw();
    }
    static setPlayerInformation(player)
    {
        for(let i = 0;i < Game.otherPlayers.length;i++)
        {
            if(Game.otherPlayers[i].id == player.id)
            {
                Game.otherPlayers[i] = player;
                break;
            }
        }
    }
    //buraya player'lar class olarak gelecekler
    static otherPlayers = [];
    //player
    /*
        player{
            nickname
            healt
            gunType
            position{
                x,
                y,
            }
            angle
            color
            R
        }
    */
    static drawNickname(nickname,x,y,R)
    {
        push();
        textAlign(CENTER);
        textSize(12);
        fill('white')
        text(nickname,x,y + R * 1.5);
        pop();
    }
  

    static drawHealthBar(health,x,y,R)
    {

        
        push();
            
        noFill();
        stroke('white');
        strokeWeight(1);
        rect(x - R,y + R * 1.7,R * 2,3);
        
        fill('white');
        noStroke();
        let calc = ((R * 2) * health) / 100; 
        rect(x - R, y + R * 1.7, calc, 3);
        


        pop();
    }

    static drawOtherPlayers()
    {
        for(let i = 0;i < Game.otherPlayers.length;i++)
        {
            /*
            return  {
                fireOwnerID: socketID,
                x: x,
                y: y,
                angle: angle,
                dx: dx,
                dy: dy,
                speed: GunClassic.bulletSpeed,
                distance: GunClassic.bulletDistance,
                color: GunClassic.bulletColor,
                height: GunClassic.bulletHeight
            };
        */
            //mermi çarpma durumlarını kontrol et
            
            let oPlayer = Game.otherPlayers[i];
            
            
            for(let k = 0; k < Game.fires.length;k++)
            {
                let fire = Game.fires[k];
                let distance = dist(fire.x,fire.y,oPlayer.position.x,oPlayer.position.y);

                
               
                


                //mesafe 50 veya 50'den küçük çarpışma var demektir
                if(distance <= 50)
                {

                    /*
                        MERMİ RAPORLAMALARI AŞAĞIDAKİ ŞEKİLDE OLACAK;

                        CASE 1
                        *CLIENT SADECE KENDISI MERMI YEDIGI ZAMAN SERVER'A RAPORLAMA YAPACAK
                        ONEMLI NOKTA: MERMI YEME DURUMU KENDI MERMISI HARIC TUTULACAK!!!
                        VE 2. ONEMLI NOKTA BELKI CLIENT OLDUGU YERDE DURUYORDUR VE INFORMATIONS RAPORLAMASI OLMUYORDUR
                        MERMI YESEDE CANI KARSI CLIENT'LARDA AYNI KALABILIR BU NEDENLE 
                        "SERVER_GET-FIRE" YAPMAK MANTIKLI OLACAKTIR...
                        

                        CASE 2
                        * KENDISI DISINDA BASKA BIR OYUNCU MERMI YEDIGINDE ISE SADECE MERMİYİ YOK EDECEK
                        ONEMLI NOKTA: YINE BURADA BU DURUMU KONTROL EDERKEN MERMIYI YIYEN KISININ KENDI
                        MERMISI OLMADIGININ KONTROLU YAPILMASI GEREKIYOR!!!




                        ILK OLARAK CLIENT KENDISI MERMI YEDIGINDE RAPORLAMA KISMI
                    */

                    if(oPlayer.id == player.id && fire.fireOwnerID != player.id && !player.isDead)
                    {
                        //MERMI YEDIM SERVER'A RAPORLAMA YAPMALIYIM

                        //Game.socket.emit('SERVER_GET-FIRE',player);
                        
                        let damageRange = fire.damageRange;
                        player.getFire(damageRange.min,damageRange.max);
                        Game.reportGetFire(player.informations,fire);
                        Game.fires.splice(k,1);

                        //mermi patlama efekti için diziye yeni effect sınıfı ekle
                        Game.fireCollisionEffects.push(new FireCollisionEffect(fire.x,fire.y));
                    }
                    
                    else if(oPlayer.id != player.id && oPlayer.id != fire.fireOwnerID && !oPlayer.isDead)
                    {
                        Game.fires.splice(k,1);

                        //mermi patlama efekti için diziye yeni effect sınıfı ekle
                        Game.fireCollisionEffects.push(new FireCollisionEffect(fire.x,fire.y));
                    }


                }

            }

            
           

            if(oPlayer.id == player.id) continue;
            
            
            
            push();
            //center
            let cx = 0;
            let cy = -45;
            //left
            let lx = -30;
            let ly = 15;
            //right
            let rx = 30;
            let ry = 15;
            
            //cx,cy,lx,ly,rx,ry degerleri birim cembere gore geldıklerı ıcın bunları 
            //oyuncunun koorinatına gore uyarlama yaptım 
            translate(oPlayer.position.x, oPlayer.position.y);
            noFill();
            stroke(oPlayer.color);
            strokeWeight(1.5);
            rotate(oPlayer.angle);
            triangle(lx,ly,cx,cy,rx,ry);

            //silahı çiz
            switch(oPlayer.gunType)
            {
                case 'CLASSIC':
                    GunClassic.draw(cx,cy,cx,cy - oPlayer.gunHeight);
                break;
            }
            

            pop();
            

            
            Game.drawNickname(oPlayer.nickname,oPlayer.position.x,oPlayer.position.y,oPlayer.R);
            Game.drawHealthBar(oPlayer.health,oPlayer.position.x,oPlayer.position.y,oPlayer.R);

        
        }
        Game.drawOutputs();
        Game.drawFireCollisionEffect();
    }
    
    static drawFireCollisionEffect()
    {
        
        for(let i = 0;i < Game.fireCollisionEffects.length;i++)
        {
            let effect = Game.fireCollisionEffects[i];

            if(effect.displayTime-- >= 0)
            {
                push();

                for(let k = 0;k < effect.effectPoints.length;k++)
                {
                    let effectPoint = effect.effectPoints[k];
                    stroke(effect.color);
                    strokeWeight(effect.weight);

                    point(effectPoint.x,effectPoint.y);
                    effectPoint.x += effectPoint.vector.dx * effect.speed;
                    effectPoint.y += effectPoint.vector.dy * effect.speed;
                }

                pop();
            }
            else
            {
                Game.fireCollisionEffects.splice(i,1);
            }

        }
    }
    
    

    //buraya mermiler object olarak gelecekler
    static fires = [];
    
    //burada merminin çarptığı yerlerdeki mermi patlama efekti için gerekli efekt bilgileri tutulacak
    static fireCollisionEffects = [];

    

    static addFire(fire)
    {
        this.fires.push(fire);
    }

    /*
        initial position x  baslangıc x
        initial position y  baslangıc y
        dx                  kosinüs angle
        dy                  sinüs angle
        speed               mermi hızı
        distance            gidebilecegi mesafe => baslangıc koordinat degerleri - anlık konum == distance ise yok et
        fireOwnerID          mermiyi atan kişi socket id
        color
        height
    */
    static drawFires()
    {
       
        /*
            fireOwnerID: socketID,
            x: x,
            y: y,
            angle: angle,
            dx: dx,
            dy: dy,
            speed: GunClassic.bulletSpeed,
            distance: GunClassic.bulletDistance,
            color: GunClassic.bulletColor,
            height: GunClassic.bulletHeight
        */

        for(let i = 0;i < Game.fires.length;i++)
        {
            push();
            let fire = Game.fires[i];

            if(fire.distance-- >= 0)
            {
                stroke(fire.color);
                strokeWeight(2);
                translate(fire.x,fire.y);
                rotate(fire.angle);
                line(fire.dx,fire.dy,fire.dx,fire.dy + fire.height);

                fire.x += fire.dx * fire.speed;
                fire.y += fire.dy * fire.speed;

            }
            else
            {
                Game.fires.splice(i,1);

            }

            
            pop();
        }
    }

    //ekrana bastırılacak mesajların tutulacagı dizi (giris,cikis ve adam oldurme)
    /*
        message
    */
    static outputs = [];
    
    static addOutput(message)
    {
        Game.outputs.push({
            message: message,
            displayTime: 200
        });
    }

    static drawOutputs()
    {
        let y = 10;
        for(let i = 0;i < Game.outputs.length;i++)
        {
            let output = Game.outputs[i];
            if(output.displayTime-- >= 0)
            {
                push();
                fill('white');
                textSize(14);
                textAlign(LEFT)
                text(output.message,Game.screenWidth - 300,y += 20);
                pop();
            }
            else
            {
                Game.outputs.splice(i,1);
            }
        }



        //sürekli kalacak olan çizimler

        push();

        textAlign(LEFT);
        textSize(14);
        fill('white');
        text(`Oyuncu:${Game.otherPlayers.length}`,10,20);

        pop();


    }

    //ekranın boyutunun Game classının ozellıklerıne atanması
    static reloadScaleOfScreen()
    {
        Game.screenWidth = (windowWidth > 1200) ? 1200 : windowWidth - 20;
        
        Game.screenHeight = (windowHeight > 1000) ? 1000: windowHeight - 20;


        Game.centerOfWidth = (Game.screenWidth - 20) / 2;
        Game.centerOfHeight = (Game.screenHeight  - 20) / 2;
    }




    //birincil player oyuna girdiğinde server'a yeni oyuncu bildirimi gonder
    static reportNewLogin()
    {
        Game.socket.emit("SERVER_NEW-USER-LOGIN",player.informations);
    }

    //birincil player hareket vs. bir event yaptıgında server'a bildirim gonder
    //player'ın butun ozellıklerını gonder
    static reportPlayerMove()
    {
        Game.setPlayerInformation(player.informations);
        Game.socket.emit('SERVER_PLAYER-INFORMATION',player.informations);
    }

    //merminin ozellıklerını object olarak gonder
    static reportFire(fire)
    {
        Game.socket.emit('SERVER_FIRE',fire);
    }

    static reportGetFire(player,fire)
    {
        Game.socket.emit('SERVER_GET-FIRE',{player:player,fire:fire});
    }

    static getNickname()
    {
        return prompt("SHIP WAR by Murat YAPICI\nOyun için nickname gir...","Oyuncu");
    }





    static getRandomBetween(min,max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}