class GameSystem {
    static FIELD_W = 800;
    static FIELD_H = 600;
    constructor(){
        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext('2d');

        // フィールドクラス、漁師クラスの宣言
        this.field = new Field();
        this.ryoushi = new Ryoushi();
        // 魚玉管理クラス
        this.fishManager = new FishManager();
        // 入力用
        this.input = new KeyInput();
        // ランキング管理部
        this.ranking = new RankingManager();
        // ゲームオーバーの場合に操作などを停止させるためのフラグ
        this.gameIsOver = false;

    }

	// 背景色で塗る
    clear(){
	    this.context.fillStyle = 'skyblue';
    	this.context.fillRect(0, 0, 
            GameSystem.FIELD_W, GameSystem.FIELD_H);
    }

    update(callback){
        this.clear();
        // ゲームオーバーのときは漁師や魚玉の移動処理などは実行しない。
        // その他は描画する
        if(this.gameIsOver == false){
    	    this.ryoushi.update(this);
            this.fishManager.update(this);
        }

    	this.field.draw(this.context);
	    this.ryoushi.draw(this.context);
        this.fishManager.draw(this.context);
        this.drawInformationArea(this.context);
        this.ranking.draw(this.context);

        this.gameover();
	    // update関数（今呼び出してる関数）と同じ関数を呼ぶ
	    window.requestAnimationFrame(this.update.bind(this));
    }

    // 1回目のupdate関数を呼び出してゲーム開始
    run(){
        window.requestAnimationFrame(this.update.bind(this));
    }

    // ゲームオーバー判定
    gameover(){
        // 魚玉が溢れたら終わり。
        // つまり、一番上にいる魚が漁師より上にいるかどうかを調べる。
        let highestFish = this.fishManager.getHighestFish();

        if(highestFish == null) return;

        // リリース済みでないといけない
        if(highestFish.released == false) return;

        // 一番上にある魚玉のY座標が漁師よりも小さくなったらゲームオーバー
        if(highestFish.position.y < this.ryoushi.position.y){
            if(this.gameIsOver == false){
                
                this.ranking.add(Score.current);
                this.ranking.save();
            }
            this.gameIsOver = true;
        }
    }

    drawInformationArea(context){
        // 上部
        context.fillStyle = "black";
        context.font = "20px arial black";
        context.fillText("スコア", 50, 50);

        // スコア部分
        context.fillStyle = "yellow";
        context.strokeStyle = "black";
        context.font = "40px arial black";
        context.fillText(Score.current.toString().padStart(5,"0"), 50, 100);
        context.strokeText(Score.current.toString().padStart(5,"0"), 50, 100);
    }
}
