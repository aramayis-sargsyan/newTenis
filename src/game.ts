import * as PIXI from "pixi.js";
import { Arena } from "./arena/arena";
import { Score } from "./score";
import { ArenaBeckground } from "./arena/arena-bg";

export class Game extends PIXI.Application {
  x: number[];
  arena: Arena;
  score: Score;
  bgBoard: ArenaBeckground;
  yourScore: number;
  highScore: number;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xbbbbbb,
    });
    this.yourScore = 0;
    this.highScore = 0;

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    this._buildBgBoard();
    this._buildArea();
    this._buildScore();
  }

  _resize(width?, height?) {
    width = width || window.innerWidth;
    height = height || window.innerHeight;

    this._resizeCanvas(width, height);
    this._resizeRenderer(width, height);
  }

  _resizeCanvas(width, height) {
    const { style } = this.renderer.view;

    style.width = width + "px";
    style.height = height + "px";
  }

  _resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }

  _buildBgBoard() {
    this.bgBoard = new ArenaBeckground();
    this.bgBoard.buildBg();
    this.bgBoard.buildRow();
    this.stage.addChild(this.bgBoard);
  }

  _buildArea() {
    this.arena = new Arena();
    this.arena.buildYourCell();
    this.arena.buildBotCell();
    this.arena.buildBall();
    this.stage.addChild(this.arena);
    this.arena.on("loseYou", this.loseGame, this);
    this.arena.on("loseBot", this.loseGame, this);
  }

  _buildScore() {
    this.score = new Score();

    this.score.getYourScore(this.yourScore);
    this.score.getHighScore(this.highScore);
    this.score.pivot.set(this.score.width * 0.5, this.score.height * 0.5);
    this.score.position.set(this.screen.width * 0.5, this.screen.height * 0.05);

    this.stage.addChild(this.score);
  }

  loseGame(e) {
    if (e === "you") {
      this.yourScore += 1;
    } else {
      this.highScore += 1;
    }
    this.score.destroy();
    this._buildScore();
  }

  _update() {
    this.arena.moveBall();
  }
}
