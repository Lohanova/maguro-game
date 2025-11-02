class PysicalCircle {
    constructor(){
        this.p = new Vector2D(0,0);
        this.v = new Vector2D(0,4);
        this.a = new Vector2D(0,0.1);
        this.r = 1.0;
    }

    // 更新メソッド
    update(){
        // 速度ベクトルに加速度ベクトルを加算
        this.v.add(this.a);
        // 座標ベクトルに速度ベクトルを加算
        this.p.add(this.v);
    }

    setP(x,y){
        this.p.set(x,y);
    }

    setV(x,y){
        this.v.set(x,y);
    }

    setA(x,y){
        this.a.set(x,y);
    }
    
    setR(r){
        this.r = r;
    }

    // 壁との接触チェック、および修正ベクトルの取得. 修正があれば差分すべきベクトルを返す
    getStickOutWithWall(fx, fy, fw, fh){
        // 魚玉が下端からはみ出てるかチェック
        var v = this.p.y + this.r - (fy + fh);
        if(v > 0){
            return new Vector2D(0, -v);
        }

        // 右端の処理
        v = this.p.x + this.r - (fx + fw);
        if(v > 0){
            return new Vector2D(-v, 0);
        }

        v = this.p.x - this.r - fx;
        if(v < 0){
            return new Vector2D(-v, 0);
        }

        return null;
    }

    // 他の玉に対して、はみ出さないか。はみ出す場合はどのくらいはみ出てるのか、打ち消しベクトルを返す
    getStickOutWithCircle(circle){
        // 対象の玉の中心間の差分ベクトルを作る。（対象の玉からこの玉へのベクトル）
        var v = Vector2D.diff(this.p, circle.p);
        // ↑の大きさ（ノルムつまり中心間距離）を算出
        var length = v.norm();
        // ↑の中心間距離が、それぞれの円の半径の合計よりも小さければはみ出る
        if(length <= this.r + circle.r){
            // その場合は打ち消し分の差分ベクトルを返さないといけない
            // vの単位ベクトルにオーバーラップしている大きさをかけてやったベクトルが打ち消しベクトル
            return Vector2D.scalar(v.unit(), this.r + circle.r - length);
        }

        // はみ出ない場合はnullを返す
        return null;
    }
    
}
