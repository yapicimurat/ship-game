
//CUSTOM KEY ENUM
const C_KEYBOARDS = {
    SPACE: 32
};



//basılı kalabilecek tuslar
function keyboard()
{
    if(keyIsDown(UP_ARROW))
    {
        player.rotate('forward');
    }
    if(keyIsDown(DOWN_ARROW))
    {
        player.rotate('back');
    }
    if(keyIsDown(LEFT_ARROW))
    {
        player.rotate('left');
    }
    if(keyIsDown(RIGHT_ARROW))
    {
        player.rotate('right');
    }

}


//tek sefer bas cek tuslar
function keyPressed(e)
{   
    switch(e.keyCode)
    {
        case C_KEYBOARDS.SPACE:
            //player sinifindaki atesleme fonksiyonunu tetikle
            player.fire();
        break;

    }
}