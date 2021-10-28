class Player
{

    constructor()
    {
        //birim çemberin çapı rotate işlemleri için 
        this.R = 30;

        //KARAKTER BILGILERI
        this.id = -1;
        this.nickname = "Player";
        this.position = {
            x: 150,
            y: 150,
            dx: 0,
            dy: 0
        };
        this.health = 100;
        this.isDead = false;
        this.maxSpeed = 7;
        this.currentSpeed = 0;
        this.color = 'white';
        
        //bu degisken birden fazla olusturdugum Gun siniflarindan bir tanesini alacak ve oyuncu
        //kazandigi Gun ozelliklerine erisecek
        this.gun = GunClassic;

        //açı ve açı değişim hızı
        this.angle = 0;
        this.angleSpeed = 5;


        //gemiyi yavaşlatmak için
        this.elapsedTime = 0;

    }

    draw()
    {
        push();
       
        //center
        let cx = 0;
        let cy = -45;
        //left
        let lx = -30;
        let ly = 15;
        //right
        let rx = 30;
        let ry =  15;
        
        //cx,cy,lx,ly,rx,ry degerleri birim cembere gore geldıklerı ıcın bunları 
        //oyuncunun koorinatına gore uyarlama yaptım 
        translate(this.position.x, this.position.y);
        noFill();
        stroke(this.color);
        strokeWeight(1.5);
        rotate(this.angle);
        triangle(lx,ly,cx,cy,rx,ry);


        //silahı çiz
        this.gun.draw(cx,cy,cx,cy - this.gun.gunHeight);

        pop();

        Game.drawNickname(this.nickname,this.position.x,this.position.y,this.R);
        Game.drawHealthBar(this.health,this.position.x,this.position.y,this.R);
        
        this.move();
    }

    

    rotate(direction)
    {   
        if(this.isDead) return false;
        //direction veri tipi string => left,right,forward,back
        switch(direction)
        {
            case 'forward':
                
                //ileri komutu geldiginde gemiye pozitif kuvvet etkisi yap
                //her ileri komutunda geminin vektorunu yeni yöndeki vektor ile topla
                this.position.dx = Helper.valueLimiter(this.position.dx,-1,1,cos(this.angle - 90) * 0.01);
                this.position.dy = Helper.valueLimiter(this.position.dy,-1,1,sin(this.angle - 90) * 0.01);
                this.addForce(0.5);

                //player bilgilerini server'a gonder
                Game.reportPlayerMove();
            break;

            case 'right':
                //açıyı arttır
                this.angle += this.angleSpeed;


                //player bilgilerini server'a gonder
                Game.reportPlayerMove();
            break;

            case 'left':
                //açıyı azalt
                this.angle -= this.angleSpeed;


                //player bilgilerini server'a gonder
                Game.reportPlayerMove();
            break;
        }

    }



    move()
    {

        //burası gemi hız kazandıktan sonra yavaş yavaş geminin durabilmesi için
        //her 25 display time seferınde geminin gecerli hizini dusuruyor
        if(this.elapsedTime++ >= 25)
        {
            this.elapsedTime = 0;

            this.addForce(-0.7);

            if(this.currentSpeed == 0)
            {
                this.setRotate();
            }
            
        }
        else
        {
            this.elapsedTime++;
        }

        

        //geminin x ve y koordinatlarının dx ve dy vektorlerıne gore değişimi
        //hizi dahil etmek icin vektorler ile carptim
        this.position.x += this.position.dx * this.currentSpeed;
        this.position.y += this.position.dy * this.currentSpeed;


        //player ekranın herhangi bir yerinden taştıysa onu zıt konuma gönder
       

        //ilk olarak sağ ekrandan dısarı cıktıysa sol ekrana ısınla
        this.position.x = (this.position.x - this.R >= Game.screenWidth) ? 0 : this.position.x;
        //ikinci olarak sol ekrandan dısarı cıktıysa sağ ekrana ısınla
        this.position.x = (this.position.x + this.R <= 0) ? Game.screenWidth + this.R : this.position.x;
        //ucuncu olarak yukarı ekrandan dısarı cıktıysa asagidaki ekrana isinla
        this.position.y = (this.position.y + this.R <= 0) ? Game.screenHeight - this.R : this.position.y;
        //son olarak asagi ekrandan disari cıktıysa yukarı ekrana ısınla
        this.position.y = (this.position.y - this.R >= Game.screenHeight) ? 0 - this.R : this.position.y;  


        //oyuncu hareketsizken gereksiz olarak sinyal gondermemesı ıcın gecerlı hız 0 dan buyuk ise kontrolü
        if(this.currentSpeed > 0)
        {
            Game.reportPlayerMove();
        }
    }

    addForce(force)
    {
       
        //gelen kuvveti, olusturdugum Helper sınıfındaki deger sınırlayıcı metodum ile sınırlayarak
        //dusurme veya arttırma ıslemı uyguladım

        
        this.currentSpeed = Helper.valueLimiter(this.currentSpeed,0,this.maxSpeed,force);

            
    }

    setRotate()
    {
        //geminin o andaki açısını kosinüs ve sinüs ile aldım ve dx,dy degiskenlerine aktardım
        this.position.dx = cos(this.angle - 90);
        this.position.dy = sin(this.angle - 90);
    }



    fire()
    {
        //oyuncunun ates bilgileri icin bir class olustur ve orada mermi hakkindaki bilgileri tut
        let fireProperties = this.gun.fireUp(this.position.x + cos(this.angle - 90) * 50,this.position.y + sin(this.angle - 90) * 50,cos(this.angle - 90 ),sin(this.angle - 90),this.angle,this.id);


        Game.addFire(fireProperties);
        Game.reportFire(fireProperties);
    }

    getFire(min,max,fireOwnerPlayer)
    {
        let damage = Game.getRandomBetween(min,max);

        if(player.health - damage > 0)
        {
            this.health = this.health - damage; 
        }
        else 
        {
            this.health = 0;
            this.color = 'red';
            this.isDead = true;
            
        }


    }
    


    get informations()
    {
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

        return {
            id: this.id,
            nickname: this.nickname,
            health: this.health,
            gunType: this.gun.TYPE,
            gunHeight: this.gun.gunHeight,
            position: this.position,
            angle: this.angle,
            color: this.color,
            isDead: this.isDead,
            R: this.R
        };

    }

}