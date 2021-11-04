import { Container } from "pixi.js";
import { Cell } from "./cell";
import { ArenaConfig } from "../config";
import { Ball } from "./ball";
import {
  checkWorldBounds,
  ballCell,
  checkCellBounds,
  moveYourCell,
  moveBotCell,
} from "./arena-check-bounds";

export class Arena extends Container {
  ball: Ball;
  yourCell: Cell;
  botCell: Cell;
  wall: Cell;
  mouseStart: { x: number; y: number };
  mouseEnd: { x: number; y: number };
  endCordinate: { x: number; y: number };
  count: number;
  yourKeyDoun: boolean;
  start: string;
  constructor() {
    super();
    this.mouseStart = {
      x: 0,
      y: 0,
    };
    this.endCordinate = {
      x: 0,
      y: 0,
    };
    this.count = 1;
    this.start = "bot";
  }

  buildBall() {
    const { board_height } = ArenaConfig;

    this.ball = new Ball();
    this.ball.build();
    this.ball.position.set(
      window.innerWidth / 2,
      window.innerHeight - board_height / 2
    );
    this.ball.tint = 0xff0000;
    this.ball.setVelosity();
    this.addChild(this.ball);
  }

  buildYourCell() {
    const { cell_width, cell_height, board_lineStyle } = ArenaConfig;

    this.yourCell = new Cell();
    this.yourCell._build(cell_width, cell_height, 0);
    this.yourCell.position.set(
      window.innerWidth / 2,
      window.innerHeight - board_lineStyle - cell_height / 2
    );
    this.addChild(this.yourCell);

    document.addEventListener("keydown", this.onYourKeyDown.bind(this));
    document.addEventListener("keydown", this.onBotKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  buildBotCell() {
    const { cell_width, cell_height, board_lineStyle, board_height } =
      ArenaConfig;

    this.botCell = new Cell();
    this.botCell._build(cell_width, cell_height, 0);
    this.botCell.position.set(
      window.innerWidth / 2,
      window.innerHeight - board_height + board_lineStyle + cell_height / 2
    );
    this.addChild(this.botCell);
  }

  checkLoseBounds() {
    const { board_lineStyle: cell_lineStyle, board_height: board_height } =
      ArenaConfig;

    if (
      this.ball.position.y >=
      window.innerHeight - this.ball.height / 2 - cell_lineStyle
    ) {
      this.ball.position.set(
        window.innerWidth / 2,
        window.innerHeight - board_height / 2
      );
      this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
      if (this.start === "bot") {
        this.botCell.position.x = window.innerWidth / 2;
      }

      this.emit("loseBot", "you");
    } else if (
      this.ball.position.y <=
      window.innerHeight - board_height + this.ball.width / 2 + cell_lineStyle
    ) {
      this.ball.position.set(
        window.innerWidth / 2,
        window.innerHeight - board_height / 2
      );
      this.ball.velocity.y = Math.abs(this.ball.velocity.y);
      if (this.start === "bot") {
        this.botCell.position.x = window.innerWidth / 2;
      }
      this.emit("loseYou", "Bot");
    }
  }

  moveBall() {
    const {
      cell_width,
      cell_height,
      ball_radius,
      ball_velocity,
      board_width,
      board_lineStyle,
      cell_move,
    } = ArenaConfig;

    this.ball.position.set(
      (this.ball.position.x += this.ball.velocity.x),
      (this.ball.position.y += this.ball.velocity.y)
    );

    if (this.yourKeyDoun) {
      if (this.start === "you") {
        moveBotCell(this.yourKeyDoun, this.botCell, 65, 68);
      }
      moveYourCell(this.yourKeyDoun, this.yourCell, 37, 39);
    }

    if (this.start === "bot") {
      if (
        this.ball.position.x >= this.botCell.position.x &&
        this.ball.velocity.y < 0
      ) {
        if (
          this.botCell.position.x <
          (window.innerWidth + board_width) / 2 -
            board_lineStyle -
            this.botCell.width / 2 -
            cell_move
        ) {
          this.botCell.position.x += Math.abs(this.ball.velocity.x) * 0.9;
        } else {
          this.botCell.position.x =
            (window.innerWidth + board_width) / 2 -
            board_lineStyle -
            this.botCell.width / 2;
        }
      } else if (
        this.ball.position.x < this.botCell.position.x &&
        this.ball.velocity.y < 0
      ) {
        if (
          this.botCell.position.x >
          (window.innerWidth - board_width) / 2 +
            board_lineStyle +
            this.botCell.width / 2 +
            cell_move
        ) {
          this.botCell.position.x -= Math.abs(this.ball.velocity.x) * 0.9;
        } else {
          this.botCell.position.x =
            (window.innerWidth - board_width) / 2 +
            board_lineStyle +
            this.botCell.width / 2;
        }
      }
    }

    if (this.ball.position.y === window.innerHeight - cell_height / 2) {
      this.count = 1;
    }
    checkWorldBounds(this.ball);
    this.checkLoseBounds();

    this.ball.velocity.x =
      (this.ball.velocity.x / Math.abs(this.ball.velocity.x)) * ball_velocity.x;

    if (
      ballCell(
        this.ball.position.x,
        this.ball.position.y,
        ball_radius,
        this.yourCell.position.x - cell_width / 2,
        this.yourCell.position.y - cell_height / 2,
        cell_width,
        cell_height
      )
    ) {
      checkCellBounds(this.ball, this.yourCell, 1);
    }

    if (
      ballCell(
        this.ball.position.x,
        this.ball.position.y,
        ball_radius,
        this.botCell.position.x - cell_width / 2,
        this.botCell.position.y - cell_height / 2,
        cell_width,
        cell_height
      )
    ) {
      checkCellBounds(this.ball, this.botCell, -1);
    }
  }

  onYourKeyDown(key) {
    this.yourKeyDoun = key;
  }
  onBotKeyDown(key) {
    if (this.start === "you") {
      this.yourKeyDoun = key;
    }
  }
  onKeyUp() {
    this.yourCell.velocity = 0;
    this.yourKeyDoun = false;
  }
}
