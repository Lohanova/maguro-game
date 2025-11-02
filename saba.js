class Saba extends FishBall {
    // 静的フィールド（クラス共通で使うもの）の宣言
    static classImg = new Image();
    static loaded = false;
    constructor(){
        super();
        this.img = Saba.classImg;
        this.srcSize = {W:800, H:405};
        this.drawSize = {W:80, H:40};
        this.circleFill = "pink";
        this.circle.setR(this.drawSize.W / 2);
    }

    // サバ玉に関する更新メソッド
    update(system){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Saba.loaded){
            super.update(system)
        }
    }

    // 描画メソッド
    draw(context){
        // サバ玉の絵が読み込み済みであれば、ifの中を実行する
        if(Saba.loaded){
            super.draw(context);
        }
    } 
}

// 静的フィールド・メソッドの処理
Saba.classImg.src = './img/fish_saba.png';
// 自キャラ画像の読み込み（読み込みが終わるまではthis.loadedはfalse）
Saba.classImg.onload = function(){
    Saba.loaded = true;
};
