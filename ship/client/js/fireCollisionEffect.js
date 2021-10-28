class FireCollisionEffect
{
    constructor(x,y)
    {
        this.centerX = x;
        this.centerY = y;
        this.displayTime = 7;
        
        this.effectPoints = [];

        this.color = 'white';
        this.speed = 5;
        this.weight = 5;

        this.createPoints();

    }


    createPoints()
    {
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(90),
                dy: sin(90),
            }
        });

        //asagi dogru gidecek parca
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(-90),
                dy: sin(-90),
            }
        });

        //sag dogru gidecek parca
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(0),
                dy: sin(0),
            }
        });

        //sola dogru gidecek parca
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(180),
                dy: sin(180),
            }
        });

        //yukari sol capraz
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(135),
                dy: sin(135),
            }
        });
        //yukari sag capraz
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(45),
                dy: sin(45),
            }
        });

        //asagi sol capraz
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(-135),
                dy: sin(-135),
            }
        });

        //asagi sag capraz
        this.effectPoints.push({
            x: this.centerX,
            y: this.centerY,
            color: this.color,
            vector: {
                dx: cos(-45),
                dy: sin(-45),
            }
        });


    }



}