import * as PIXI from "pixi.js";
import { Arena } from "./arena/arena";
import { ArenaBeckground } from "./arena/arena-bg";

export class Game extends PIXI.Application {
  x: number[];
  arena: Arena;
  bgBoard: ArenaBeckground;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xbbbbbb,
    });

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    this._buildBgBoard();
    this._BuildArea();
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

  _BuildArea() {
    this.arena = new Arena();
    this.arena.buildCell();
    this.arena.buildBall();
    this.stage.addChild(this.arena);
  }

  _update() {
    this.arena.moveBall();
    //
  }
}
