import * as PIXI from "pixi.js";
import { Arena } from "./arena/arena";
import { Score } from "./arena/score";
import { Popap } from "./arena/popap";
import { ArenaBeckground } from "./arena/arena-bg";
import { ArenaConfig } from "./config";

export class Game extends PIXI.Application {
  x: number[];
  arena: Arena;
  score: Score;
  Popap: Popap;
  losePopap: Popap;
  bgBoard: ArenaBeckground;
  yourScore: number;
  botScore: number;
  bot: string;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xbbbbbb,
    });
    this.yourScore = 0;
    this.botScore = 0;

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();
    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    this._buildBgBoard();
    this._buildArea();
    this._buildScore("Player 2");
    this.buildPopap("Game start");
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

  _buildScore(bot) {
    this.score = new Score();

    this.score.getYourScore(`Player 1 :  ${this.yourScore}`);
    this.score.getBotScore(`${bot} :  ${this.botScore}`);

    this.score.pivot.set(this.score.width * 0.5, this.score.height * 0.5);
    this.score.position.set(this.screen.width * 0.5, this.screen.height * 0.05);

    this.stage.addChild(this.score);
  }

  loseGame(e) {
    const { board_height, board_lineStyle, cell_height, score, ball_velocity } =
      ArenaConfig;
    console.log(ball_velocity.x);

    this.arena.ball.velocity.x = ball_velocity.x;
    this.arena.ball.velocity.y = ball_velocity.y;
    if (e === "you") {
      this.botScore += 1;
    } else {
      this.yourScore += 1;
    }
    if (this.yourScore === score) {
      this.arena.ball.velocity.y = 0;
      this.arena.ball.position.x = window.innerWidth / 2;
      this.arena.ball.position.y = window.innerHeight - board_height / 2;
      this.arena.yourCell.position.x = window.innerWidth / 2;
      this.arena.yourCell.position.y =
        window.innerHeight - board_lineStyle - cell_height / 2;
      this.arena.botCell.position.x = window.innerWidth / 2;
      this.arena.botCell.position.y =
        window.innerHeight - board_height + board_lineStyle + cell_height / 2;
      if (this.arena.start === "bot") {
        this.buildPopap("You Win");
      } else {
        this.buildPopap("Player 1  Win");
      }
    }
    if (this.botScore === score) {
      this.arena.ball.velocity.y = 0;
      this.arena.ball.position.x = window.innerWidth / 2;
      this.arena.ball.position.y = window.innerHeight - board_height / 2;
      this.arena.yourCell.position.x = window.innerWidth / 2;
      this.arena.yourCell.position.y =
        window.innerHeight - board_lineStyle - cell_height / 2;
      this.arena.botCell.position.x = window.innerWidth / 2;
      this.arena.botCell.position.y =
        window.innerHeight - board_height + board_lineStyle + cell_height / 2;
      if (this.arena.start === "bot") {
        this.buildPopap("You lose");
      } else {
        this.buildPopap("Player 2  Win");
      }
    }
    this.score.destroy();
    this._buildScore(this.bot);
  }

  buildPopap(win_lose) {
    this.Popap = new Popap();
    this.Popap.on("_onClickBot", this.destroyBotPopap, this);
    this.Popap.on("_onClickYou", this.destroyYourPopap, this);
    this.Popap.buildBoard(this.screen.width, this.screen.height, 0.3);
    this.Popap.buildLosBoard(this.screen.width, this.screen.height, 1);

    this.Popap.buildBotButton();
    this.Popap.buildYourButton();

    if (this.arena.start === "bot") {
      this.Popap.callScore(
        `Player 1 :  ${this.yourScore}`,
        `Bot :  ${this.botScore}`,
        win_lose
      );
    } else {
      this.Popap.callScore(
        `Player 1 :  ${this.yourScore}`,
        `Player 2 :  ${this.botScore}`,
        win_lose
      );
    }
    this.Popap.backCollor.pivot.set(
      this.Popap.backCollor.width * 0.5,
      this.Popap.backCollor.height * 0.5
    );
    this.Popap.backCollor.position.set(
      this.screen.width * 0.5,
      this.screen.height * 0.5
    );
    this.stage.addChild(this.Popap);
  }

  destroyPopap() {
    const { board_height, ball_velocity } = ArenaConfig;

    if (this.Popap) {
      this.Popap.destroy();
      this.yourScore = 0;
      this.botScore = 0;
      this.arena.ball.position.x = window.innerWidth / 2;
      this.arena.ball.position.y = window.innerHeight - board_height / 2;
      this.arena.ball.velocity.y = ball_velocity.y;
    }
  }

  destroyBotPopap() {
    this.score.destroy();
    this.Popap.destroy();
    this.yourScore = 0;
    this.botScore = 0;
    this.arena.start = "bot";

    this.bot = "Bot";
    this._buildScore(this.bot);

    this.destroyPopap();
  }

  destroyYourPopap() {
    const { board_height, board_lineStyle, cell_height } = ArenaConfig;
    this.score.destroy();
    this.Popap.destroy();
    this.yourScore = 0;
    this.botScore = 0;
    this.bot = "Player 2";
    this._buildScore(this.bot);

    this.arena.start = "you";
    this.arena.botCell.position.x = window.innerWidth / 2;
    this.arena.botCell.position.y =
      window.innerHeight - board_height + board_lineStyle + cell_height / 2;
    this.destroyPopap();
  }

  _update() {
    this.arena.move();
  }
}
