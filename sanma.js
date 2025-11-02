class Sanma extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Sanma.classImg;
        this.srcSize = {W:800, H:423};
        this.drawSize = {W:40, H:21};
        this.circleFill = "orange";
        this.circle.setR(this.drawSize.W / 2);
    }

    // サバ玉に関する更新メソッド
    update(system){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Sanma.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Sanma.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Sanma.classImg.src = './img/fish_sakana_sanma.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Sanma.classImg.onload = function(){
    Sanma.loaded = true;
};

