class Field {
	// 背景ファイル
	static SRC_X = 500;
	static SRC_Y = 0;
	static SRC_W = 600;
	static SRC_H = 800;
	static X = 225;
	static Y = 100;
	static W = 350;
	static H = 475;
	// コンストラクタ。
	// クラスの初期化（クラスのフィールド変数への初期値設定など）を行うところ。
	constructor(){
		this.bgLoaded = false;
		this.imgBackground = new Image();
		this.imgBackground.src = './img/bg_natural_ocean.jpg';
		// 背景画像の読み込み
		this.imgBackground.onload = function(){
			this.bgLoaded = true;
		}.bind(this);
	}
	
	// 描画メソッド
	draw(context){
		if(this.bgLoaded){
			// 枠線を描画
			context.strokeStyle = 'black';
			context.lineWidth = 30.0;
			context.strokeRect(Field.X, Field.Y, Field.W, Field.H);
	
			// フィールド画像を描画
			context.drawImage(this.imgBackground, Field.SRC_X, Field.SRC_Y, 
				Field.SRC_W, Field.SRC_H, Field.X, Field.Y, Field.W, Field.H);
		}
	}
}