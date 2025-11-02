class Nijimasu extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Nijimasu.classImg;
        this.srcSize = {W:800, H:513};
        this.drawSize = {W:60, H:38};
        this.circleFill = "red";
        this.circle.setR(this.drawSize.W / 2);
    }

    // サバ玉に関する更新メソッド
    update(system){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Nijimasu.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Nijimasu.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Nijimasu.classImg.src = './img/fish_nijimasu.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Nijimasu.classImg.onload = function(){
    Nijimasu.loaded = true;
};

