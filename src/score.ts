import { Container, Text, TextStyle } from "pixi.js";

export class Score extends Container {
  highScore: number;
  yourScore: number;
  style: TextStyle;
  constructor() {
    super();

    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 25,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#666666"],
      strokeThickness: 5,
    });

    if (Number(localStorage.getItem("BotScore")) !== 0) {
      this.highScore = Number(localStorage.getItem("BotScore"));
    }
  }

  getYourScore(score) {
    let textYou = new Text(`Your score ${score}`, this.style);
    textYou.position.set(0, 0);
    this.addChild(textYou);
  }

  getHighScore(score) {
    let textBot = new Text(`Bot score ${score}`, this.style);
    textBot.position.set(250, 0);
    this.addChild(textBot);
  }
}
