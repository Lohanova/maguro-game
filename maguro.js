class Maguro extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Maguro.classImg;
        this.srcSize = {W:800, H:513};
        this.drawSize = {W:200, H:128};
        this.circleFill = "black";
        this.circle.setR(this.drawSize.W / 2);
    }

    //玉に関する更新メソッド
    update(system){
        // 玉の絵が読み込み済みであれば、ifの中を実行する
        if(Maguro.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Maguro.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Maguro.classImg.src = './img/fish_maguro.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Maguro.classImg.onload = function(){
    Maguro.loaded = true;
};
