class GunClassic
{
    static TYPE = 'CLASSIC';


    static bulletCapacity = 20;
    static bulletSpeed = 20;
    static bulletFiringFrequency = 50; //elapsedTime'a göre belirledim
    static bulletDistance = 75;
    static bulletColor = 'white';
    static bulletHeight = 10;
    static restOfBullet = 20;
    static bulletDamageRange = {
        min: 1,
        max: 3
    };

    static gunHeight = 10;

    static draw(x1,y1,x2,y2)
    {
        //mermi yerini çiz
        line(x1,y1,x2,y2);
    }

    static fireUp(x,y,dx,dy,angle,socketID)
    {

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
       return  {
        fireOwnerID: socketID,
        x: x,
        y: y,
        angle: angle,
        dx: dx,
        dy: dy,
        speed: GunClassic.bulletSpeed,
        distance: GunClassic.bulletDistance,
        damageRange: GunClassic.bulletDamageRange,
        color: GunClassic.bulletColor,
        height: GunClassic.bulletHeight
       };

    }


    
}