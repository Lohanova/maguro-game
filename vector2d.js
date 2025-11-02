class Vector2D {
    constructor(x=0, y=0){
        this.x=x;
        this.y=y;
    }

    get(){
        return [this.x, this.y];
    }

    set(x,y){
        this.x=x;
        this.y=y;
    }

    add(v){
        this.x += v.x;
        this.y += v.y;
    }

    reverse(){
        return new Vector2D(-this.x, -this.y);
    }

    // ベクトルの大きさ(ノルム)を計算
    norm(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    // 単位ベクトルの算出
    unit(){
        var length = this.norm();
        var v = new Vector2D(this.x / length, this.y / length);

        return v;
    }

    // 2つのベクトルの和(v1とv2を足したベクトルを作る)
    static sum(v1, v2){
        var v = new Vector2D();
        v.set(v1.x+v2.x, v1.y+v2.y);
        return v;
    }

    // v1からv2を引いたベクトルを作る
    static diff(v1, v2){

        var v = new Vector2D();
        v.set(v1.x-v2.x, v1.y-v2.y);
        return v;
    }

    // ベクトルのスカラ積
    static scalar(v1, a){
        var v = new Vector2D();
        v.set(v1.x * a, v1.y * a);
        return v;
    }

    // ベクトルの内積
    static dot(v1, v2){
        return v1.x*v2.x+v1.y*v2.y;
    }

    // ベクトルの外積(Zベクトル値)
    // 2Dでは、あるベクトルに対して、もう一つのベクトルが反時計回り、
    // 時計回りのどちらにあるかを判定するために使います。
    // 戻り値が正なら、v2はv1に対して反時計方向、
    // 負ならばv2はv1の時計回り方向にあります。
    static cross(v1,v2){
        return v1.x*v2.y-v2.x*v1.y
    }

    // 二つのベクトルのなす角度
    static angle(v1, v2){
        var cos=Vector2D.dot(v1,v2)/(v1.norm()*v2.norm());
        return Math.acos(cos);
    }

    static center(v1, v2){
        return new Vector2D((v1.x + v2.x)/2.0,(v1.y + v2.y)/2.0);
    }
}

