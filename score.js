class Score{
    static current = 0;
    static map = {
        anago:1, 
        sanma:2, 
        nijimasu:6, 
        saba:10, 
        aji:15, 
        tai:21, 
        kue:28, 
        buri:36, 
        maguro:45
    };

    static set(score=0){
        Score.current = score;
    }

    static calculate(fish){
        if(fish instanceof(Anago)){
            Score.current += Score.map.anago;
        }
        else if(fish instanceof(Sanma)){
            Score.current += Score.map.sanma;
        }
        else if(fish instanceof(Nijimasu)){
            Score.current += Score.map.nijimasu;
        }
        else if(fish instanceof(Saba)){
            Score.current += Score.map.saba;
        }
        else if(fish instanceof(Aji)){
            Score.current += Score.map.aji; 
        }
        else if(fish instanceof(Tai)){
            Score.current += Score.map.tai;   
        }
        else if(fish instanceof(Kue)){
            Score.current += Score.map.kue;    
        }
        else if(fish instanceof(Buri)){
            Score.current += Score.map.buri;  
        }
        else if(fish instanceof(Maguro)){
            Score.current += Score.map.maguro;  
        }
    }
}