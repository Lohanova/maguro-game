class Kue extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Kue.classImg;
        this.srcSize = {W:800, H:527};
        this.drawSize = {W:140, H:92};
        this.circleFill = "brown";
        this.circle.setR(this.drawSize.W / 2);
    }

    //玉に関する更新メソッド
    update(system){
        // 玉の絵が読み込み済みであれば、ifの中を実行する
        if(Kue.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Kue.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Kue.classImg.src = './img/fish_kue2.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Kue.classImg.onload = function(){
    Kue.loaded = true;
};
