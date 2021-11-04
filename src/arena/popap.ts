import { Container, Graphics, Sprite, Texture, Text, TextStyle } from "pixi.js";

import { ArenaConfig } from "../config";
import { Score } from "./score";

export class Popap extends Container {
  backCollor: Graphics;
  losBoard: Graphics;
  click: boolean;
  constructor() {
    super();
    this.click = false;
  }

  buildBoard(width, height, overflow) {
    this.backCollor = new Graphics();
    this.backCollor.beginFill(0xaaaaaa, overflow);
    this.backCollor.drawRoundedRect(5, 5, width, height, 8);
    this.backCollor.endFill();

    this.backCollor.pivot.x = width / 2;
    this.backCollor.pivot.y = height / 2;
    this.backCollor.interactive = true;
    this.addChild(this.backCollor);
  }

  buildLosBoard(width, height, overflow) {
    let { phopap_width, phopap_height } = ArenaConfig;
    this.losBoard = new Graphics();

    this.losBoard.lineStyle(5, 0x000000);
    this.losBoard.beginFill(0xaaaaaa, overflow);
    this.losBoard.drawRoundedRect(5, 5, phopap_width, phopap_height, 8);
    this.losBoard.endFill();
    this.losBoard.pivot.x = phopap_width / 2;
    this.losBoard.pivot.y = phopap_height / 2;
    this.losBoard.position.set(width * 0.5, height * 0.5);

    this.backCollor.addChild(this.losBoard);
  }

  buildBotButton() {
    let { phopap_width, phopap_height } = ArenaConfig;

    const texture = Texture.from("../assets/reset.png");
    const bot = new Sprite(texture);
    bot.anchor.set(0.5);
    bot.width = 50;
    bot.height = 50;
    bot.position.set(bot.width, phopap_height * 0.8);
    bot.interactive = true;
    bot.on("pointerdown", this._onClickBot, this);
    this.losBoard.addChild(bot);
  }

  buildYourButton() {
    let { phopap_width, phopap_height } = ArenaConfig;

    const texture = Texture.from("../assets/bg.png");
    const bot = new Sprite(texture);
    bot.anchor.set(0.5);
    bot.width = 50;
    bot.height = 50;
    bot.position.set(phopap_width - bot.width, phopap_height * 0.8);
    bot.interactive = true;
    bot.on("pointerdown", this._onClickYou, this);
    this.losBoard.addChild(bot);
  }

  callScore(scoreB, scoreY, win_lose) {
    let { phopap_width, phopap_height } = ArenaConfig;
    const score = new Score();
    score.getWin(win_lose);
    score.textWin.pivot.set(score.textWin.width / 2, score.textWin.height / 2);
    score.textWin.position.set(0, 0);
    if (win_lose != "Game start") {
      score.getYourScore(scoreB);
      score.textYou.pivot.set(
        score.textYou.width / 2,
        score.textYou.height / 2
      );
      score.textYou.position.set(0, 50);

      score.getBotScore(scoreY);
      score.textBot.pivot.set(
        score.textBot.width / 2,
        score.textBot.height / 2
      );
      score.textBot.position.set(0, 100);
    }
    score.position.set(phopap_width * 0.5, phopap_height * 0.2);
    this.losBoard.addChild(score);
  }

  _onClickBot() {
    this.emit("_onClickBot", this.click);
  }

  _onClickYou() {
    this.emit("_onClickYou", this.click);
  }
}
