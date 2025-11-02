class Aji extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Aji.classImg;
        this.srcSize = {W:786, H:470};
        this.drawSize = {W:100, H:59};
        this.circleFill = "blue";
        this.circle.setR(this.drawSize.W / 2);
    }

    //玉に関する更新メソッド
    update(system){
        // 玉の絵が読み込み済みであれば、ifの中を実行する
        if(Aji.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Aji.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Aji.classImg.src = './img/fish_aji.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Aji.classImg.onload = function(){
    Aji.loaded = true;
};
