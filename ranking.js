class RankingManager{
    constructor(){
        this.scoreList1 = null;
        this.load();
    }

    

    add(score){
        // スコアをスコアリストに登録
        this.scoreList1.push(score);
    
        // ソートする
        this.scoreList1.sort((a, b) => {
            return b - a;
        });
    }
    

    load(){
        let data = localStorage.getItem("ScoreList2");
    
        if(data == null){
            this.scoreList1 = new Array();
            return;
        }

        this.scoreList1 = JSON.parse(data);
        if(this.scoreList1 == null){
            this.scoreList1 = new Array();
        }
    }

    save(){
        localStorage.setItem("ScoreList2", JSON.stringify(this.scoreList1));
    }

    // 上位5スコアを表示
    draw(context){
        if(this.scoreList1 == null) return;

        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.font = "20px arial black";

        context.fillText("ランキング", 50, 150);
        context.strokeText("ランキング", 50, 150);
        for(let i=0; i<5; i++){
            if(i==this.scoreList1.length) return;
            
            var text = (i + 1).toString() + ":";
            text += this.scoreList1[i].toString().padStart(5,"0");

            context.fillText(text, 50, 180 + i * 20);
            context.strokeText(text, 50, 180 + i * 20);
        }
    }
}

