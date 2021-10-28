class Helper
{
    constructor()
    {


        
    }

    static valueLimiter(val,minLimit,maxLimit,valToAdd)
    {
        if(valToAdd > 0)
        {
            val = (val + valToAdd <= maxLimit) ? val + valToAdd : maxLimit;
        }
        else if(valToAdd < 0)
        {
            val = (val + valToAdd >= minLimit) ? val + valToAdd : minLimit;
        }
        return val;
    }

    

}