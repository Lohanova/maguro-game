class Buri extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Buri.classImg;
        this.srcSize = {W:800, H:418};
        this.drawSize = {W:170, H:110};
        this.circleFill = "white";
        this.circle.setR(this.drawSize.W / 2);
    }

    //玉に関する更新メソッド
    update(system){
        // 玉の絵が読み込み済みであれば、ifの中を実行する
        if(Buri.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Buri.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Buri.classImg.src = './img/fish_buri.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Buri.classImg.onload = function(){
    Buri.loaded = true;
};
