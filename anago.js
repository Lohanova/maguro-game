class Anago extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Anago.classImg;
        this.srcSize = {W:800, H:758};
        this.drawSize = {W:30, H:28};
        this.circleFill = "green";
        this.circle.setR(this.drawSize.W / 2);
    }

    // サバ玉に関する更新メソッド
    update(system){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Anago.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Anago.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Anago.classImg.src = './img/fish_nishikianago.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Anago.classImg.onload = function(){
    Anago.loaded = true;
};

