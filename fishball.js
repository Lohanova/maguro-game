class FishBall{
    // 静的フィールド（クラス共通で使うもの）の宣言
    static initA = new Vector2D(0, 0.1);
    static initV = new Vector2D(0, 4);

    constructor(){
        // 魚玉。物理演算もする。
        this.circle = new PysicalCircle();

        // 絵の画像
        this.img = null;

        // 元絵のサイズ
        this.srcSize = {W:0, H:0};
        // 絵の描画サイズ
        this.drawSize = {W:0, H:0};
        this.circleFill = "";
        this.circleStroke = "black";
        this.circle.setR(this.drawSize.W);

        this.init();
    }

    init(){
        this.position = new Vector2D(0,0);
        this.circle.setA(FishBall.initA.x, FishBall.initA.y);
        this.circle.setV(FishBall.initV.x, FishBall.initV.y);
        this.released = false;
    }

    syncPositionToCircle(){
        this.position.set(this.circle.p.x - this.drawSize.W / 2,
                        this.circle.p.y - this.drawSize.H / 2);
    }

    syncPositionToPicture(){
        this.circle.setP(this.position.x + this.drawSize.W / 2,
                        this.position.y + this.drawSize.H / 2);
    }

    // 魚玉に関する更新メソッド
    update(system){
        // サバ玉がリリース済みでなければ、漁師に付き従う
        if(!this.released){
            // 魚玉の座標を漁師の座標に合わせる。
            let r = system.ryoushi.position;
            this.position.set(r.x - this.drawSize.W, r.y);
            this.syncPositionToPicture();            
        } 
        else {
            // リリース済みなので落下処理を行う。    
            this.circle.update();
            this.syncPositionToCircle();
            // 当たり判定を行い、位置を調整する。
            // this.hitCheck();
        }
    }
    
    
    // 描画メソッド
    draw(context){
        // 丸枠とその背景色の描画
        context.fillStyle = this.circleFill;
        context.strokeStyle = this.circleStroke;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.circle.p.x, this.circle.p.y, 
                    this.circle.r, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
        
		context.drawImage(this.img, 0, 0, this.srcSize.W, this.srcSize.H, 
            this.position.x, this.position.y, this.drawSize.W, this.drawSize.H);
    }
}
