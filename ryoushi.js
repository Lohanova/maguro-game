// 漁師クラス
class Ryoushi {
	constructor(){
		this.position = new Vector2D(220, 50);
		this.drawSize = {W:0, H:0};
		this.loaded = false;
		this.speed = 4;
		this.img = new Image();
		this.img.src = './img/job_gyogyou_ryoushi.png';
		this.img.onload = function(){
			this.loaded = true;
		}.bind(this);
	}

	// 漁師に関する更新メソッド
	update(system){
		// 漁師の絵が読み込み済みであれば、ifの中を実行する
		if(this.loaded){
			// 漁師の移動処理
			if(system.input.getRightPressed()){
				this.position.add(new Vector2D(this.speed, 0));
			}else if(system.input.getLeftPressed()){
				this.position.add(new Vector2D(-this.speed, 0));
			}

			var nextFish = FishManager.fishArray[FishManager.nextfish];
			// 右端の処理。
			if(Field.X+Field.W < this.position.x){
				this.position.set(Field.X+Field.W, this.position.y);
			}
			// 左端の処理
			if(Field.X > this.position.x - nextFish.drawSize.W){
				this.position.set(Field.X + nextFish.drawSize.W, this.position.y);
			}
		}
	}

	// 描画メソッド
	draw(context){
		// 漁師の絵が読み込み済みであれば、ifの中を実行する
		if(this.loaded){
			// 漁師の絵を描画
			context.drawImage(this.img, 
                0, 0, 800, 718, this.position.x, this.position.y, 64, 64);
		}
	}
}
