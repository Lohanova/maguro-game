class FishManager {
    static fishArray;
    static nextfish = 0;
    static repel = 1.3;
    constructor(){
        this.numOfFish = 100;
        FishManager.fishArray = new Array(this.numOfFish).fill().map(function(fish){
            let r = Math.random();

            if(r < 0.35){
                return new Anago();
            }
            else if(r < 0.6){
                return new Sanma();
            }
            else if(r < 0.8){
                return new Nijimasu();
            }
            else{
                return new Saba();
            }
        });

        // 配列制御用
        FishManager.nextfish = 0;
        this.releaseInterval = 120;
        this.releaseCounter = 0;
    }

    releaseFish(system){
        // リリース後の時間をカウントする変数releaseCounter
		if(this.releaseCounter > 0){
            // これが0でなければカウントが終わってないのでリリース不可能
            return;
        }
		
        // 次にリリース予定の玉の番号が、配列の範囲内であることを確認
		if(FishManager.nextfish >= FishManager.fishArray.length){
            // 配列外であればリリースできない
            return;
        }
			
        // 玉が投下済みかどうかのチェック
		if(FishManager.fishArray[FishManager.nextfish].released){
            // 投下済みなので再リリースできない
            return;
        }

        // 投下ボタンが押されているかどうかチェック
		if(system.input.getEnterPressed()){
			// 玉を投下済みにする
			FishManager.fishArray[FishManager.nextfish].released = true;
			// 次の玉がリリースできるまでの時間を設定
			this.releaseCounter = this.releaseInterval;

            let next = FishManager.fishArray.find((fish) => !fish.released);
            FishManager.nextfish = FishManager.fishArray.indexOf(next);
        }
	}

    update(system){
        // ボタンの投下状態に応じて魚玉のリリース処理を行う。
        this.releaseFish(system);

        // 魚玉のアップデート
        FishManager.fishArray.map((fish) => fish.update(system));

        // 魚玉の合体処理
        this.unionFishes();
        // 魚玉の重なり解消処理
        this.solveOverlap();
        
        // リリースカウンターのカウントダウン
        if(this.releaseCounter>0){
            this.releaseCounter--;
        }
    }

    draw(context){
        let drawList = FishManager.fishArray.filter(function(fish, i){
            if(!fish.released){
                // 次の魚ではない場合は描画しない
                if(FishManager.nextfish != i){
                    return false;
                }
                if(this.releaseCounter > 0){
                    return false;
                }
            }

            return true;
        }.bind(this))

        drawList.map((fish)=> fish.draw(context));
        console.log(this.drawList);
    }   

    static generateLargeFish(fish){
        Score.calculate(fish);

        if(fish instanceof(Anago)){
            return new Sanma();
        }
        else if(fish instanceof(Sanma)){
            return new Nijimasu();            
        }
        else if(fish instanceof(Nijimasu)){
            return new Saba();            
        }
        else if(fish instanceof(Saba)){
            return new Aji();            
        }
        else if(fish instanceof(Aji)){
            return new Tai();            
        }
        else if(fish instanceof(Tai)){
            return new Kue();            
        }
        else if(fish instanceof(Kue)){
            return new Buri();            
        }
        else if(fish instanceof(Buri)){
            return new Maguro();            
        }

        return null;
    }

    // 当たってる魚玉同士を合体させる
    unionFishes(){
        // 追加する魚のリスト
        var newFishArray = new Array();
        // 削除する魚のリスト
        var delFishArray = new Array();
        // どの玉が当たってるかをチェック
        FishManager.fishArray.map((fish1)=>{
            // 削除予定の魚の場合は飛ばす
            if(delFishArray.includes(fish1)) return;
            // 各魚について、全ての魚との当たり判定を行う
            FishManager.fishArray.map((fish2)=>{
                // 削除予定の魚の場合は当たり判定しない
                if(delFishArray.includes(fish2)) return;
                // 全く同一の要素の場合、判定は行わない
                if(fish1 === fish2) return;
                // 未リリースの魚とも判定は行わない
                if(fish1.released == false || fish2.released == false) return;

                // 当たり判定チェック
                let delta = fish1.circle.getStickOutWithCircle(fish2.circle);
            
                // 当たってない場合は何もしない
                if(delta == null){
                    return;
                }

                // 以降は当たってると判断

                // 同じ種類の魚だった場合
                if(fish1.img === fish2.img){
                    // 中点を計算
                    var center = Vector2D.center(fish1.circle.p, fish2.circle.p);
                    // 新しい魚玉を作る
                    var newFish = FishManager.generateLargeFish(fish1);
                    // マグロ同士があたったら消えるだけ
                    if(newFish != null){
                        // 新魚玉の中点を、計算した中点に設定
                        newFish.circle.p = center;
                        // 画像の左上点を同期させる。
                        newFish.syncPositionToCircle();
                        // リリースされたことにする
                        newFish.released = true;
                        // 新しい魚リストへ
                        newFishArray.push(newFish);
                    }
                    delFishArray.push(fish1);
                    delFishArray.push(fish2);
                }
            })
        })

        // 削除リストの要素を削除
        FishManager.fishArray = FishManager.fishArray.filter((fish)=>{
            if(delFishArray.includes(fish)){
                return false;
            }
            
            return true;
        });

        // 追加リストの要素を追加
        FishManager.fishArray = FishManager.fishArray.concat(newFishArray);
    }

    // オーバーラップの解消
    solveOverlap(){
        FishManager.fishArray.map((fish1)=>{
            // 各魚について、全ての魚との当たり判定を行う
            FishManager.fishArray.map((fish2)=>{
                // 全く同一の要素の場合、判定は行わない
                if(fish1 === fish2) return;
                // 未リリースの魚とも判定は行わない
                if(fish1.released == false || fish2.released == false) return;

                // 当たり判定チェック
                let delta = fish1.circle.getStickOutWithCircle(fish2.circle);
            
                // 当たってない場合は何もしない
                if(delta == null){
                    return;
                }

                // 以降は当たってる場合
                // 速度と加速度を適当な値に再設定
                delta = Vector2D.scalar(delta.unit(), FishManager.repel);
                fish1.circle.setV(delta.x,delta.y);
                fish1.circle.setA(0,0.1);
                // 相手には反発ベクトルを設定
                fish2.circle.setV(-delta.x,-delta.y);
                fish2.circle.setA(0,0.1);
                fish2.syncPositionToCircle(); 
            });
        });

        // 箱をはみ出ない処理
        FishManager.fishArray.map((fish1)=>{
            if(fish1.released == false) return;
            // 魚玉が箱からはみ出ないようにする処理   
            let dv = fish1.circle.getStickOutWithWall(Field.X, Field.Y, Field.W, Field.H);

            if(dv == null) return;
                   
            dv=Vector2D.scalar(dv.unit(), FishManager.repel);
            fish1.circle.setV(dv.x, dv.y)
            fish1.circle.setA(0,0.6);
        });
    }

    // 一番高い位置にいる魚を取得
    getHighestFish(){
        // 要素をそれぞれ比較して、高い位置（Y座標が小さい）順に並べる
        var releasedFish = FishManager.fishArray.filter((fish) => {
            if(fish.released) return true;

            return false;
        });
        
        if(releasedFish.length == 0){
            return null;
        }

        releasedFish.sort((a, b) => {
            // aよりbの方が若い要素（配列の手前にある）
            // aよりbの魚玉のY座標が大きい（つまりaの方が低い位置にある）場合は、降順なので交換
            if(a.position.y > b.position.y) return 1;
            // aよりbの魚玉のY座標が小さい場合は、昇順なのでそのまま
            else if(a.position.y < b.position.y) return -1;
            else return 0;

        });

        // 先頭の要素を取得
        return releasedFish[0];
    }
}