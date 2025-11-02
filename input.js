class KeyInput {
    constructor(){
        // 各キーの押下判定するためのフラグ
        this.leftPressed = false;
        this.rightPressed = false;
        this.enterPressed = false;
        // キーを押した場合、離した場合に実行される処理
        document.addEventListener("keydown", 
            this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", 
            this.keyUpHandler.bind(this), false);

    }

    keyDownHandler(e) {
        // 左と右どっちが押されているか
        if (e.key === "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key === "ArrowLeft") {
            this.leftPressed = true;
        } else if (e.key === "Enter"){
            this.enterPressed = true;
        }
    }

    keyUpHandler(e) {
        // 左と右どっちを離したのか
        if (e.key === "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key === "ArrowLeft") {
            this.leftPressed = false;
        } else if (e.key === "Enter"){
            this.enterPressed = false;
        }
    }

    getLeftPressed(){
        return this.leftPressed;
    }

    getRightPressed(){
        return this.rightPressed;
    }

    getEnterPressed(){
        return this.enterPressed;
    }
}

