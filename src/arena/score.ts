import { Container, Text, TextStyle } from "pixi.js";

export class Score extends Container {
  highScore: number;
  yourScore: number;
  style: TextStyle;
  textYou: Text;
  textBot: Text;
  textWin: Text;
  constructor() {
    super();

    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 20,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#ffffff", "#666666"],
      strokeThickness: 5,
      dropShadowColor: "#000000",
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: "round",
    });

    this.yourScore = 0;
    this.highScore = 0;
    if (Number(localStorage.getItem("highScore")) !== 0) {
      this.highScore = Number(localStorage.getItem("highScore"));
    }
  }

  getYourScore(score) {
    this.textYou = new Text(`${score}`, this.style);
    this.textYou.position.set(0, 0);
    this.addChild(this.textYou);
  }

  getBotScore(score) {
    this.textBot = new Text(`${score}`, this.style);
    this.textBot.position.set(250, 0);
    this.addChild(this.textBot);
  }

  getWin(win_los) {
    this.textWin = new Text(` ${win_los}`, this.style);
    this.textWin.position.set(250, 0);
    this.addChild(this.textWin);
  }
}
