import { Container } from "pixi.js";
import { Cell } from "./cell";
import { ArenaConfig } from "../config";
import { Ball } from "./ball";
import { checkWorldBounds, ballCell, checkCellBounds } from "./arena-utills";

export class Arena extends Container {
  ball: Ball;
  cell: Cell;
  wall: Cell;
  mouseStart: { x: number; y: number };
  mouseEnd: { x: number; y: number };
  endCordinate: { x: number; y: number };
  count: number;
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

  buildCell() {
    const { cell_width, cell_height, board_lineStyle } = ArenaConfig;

    this.cell = new Cell();
    this.cell._build(cell_width, cell_height, 0);
    this.cell.position.set(
      window.innerWidth / 2,
      window.innerHeight - board_lineStyle - cell_height / 2
    );
    this.addChild(this.cell);
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  moveBall() {
    const { cell_width, cell_height, ball_radius } = ArenaConfig;
    this.ball.position.set(
      (this.ball.position.x += this.ball.velocity.x),
      (this.ball.position.y += this.ball.velocity.y)
    );

    if (this.ball.position.y === window.innerHeight - cell_height / 2) {
      this.count = 1;
    }

    checkWorldBounds(this.ball);

    if (
      ballCell(
        this.ball.position.x,
        this.ball.position.y,
        ball_radius,
        this.cell.position.x - cell_width / 2,
        this.cell.position.y - cell_height / 2,
        cell_width,
        cell_height
      )
    ) {
      checkCellBounds(this.ball, this.cell);
    }
  }

  onKeyDown(key) {
    const { board_width, board_lineStyle, cell_move } = ArenaConfig;
    this.cell.velocity = cell_move;

    if (
      (key.keyCode === 68 || key.keyCode === 39) &&
      this.cell.position.x <=
        (window.innerWidth + board_width) / 2 -
          board_lineStyle -
          this.cell.width / 2 -
          cell_move
    ) {
      this.cell.position.x += cell_move;
    } else if (key.keyCode === 68 || key.keyCode === 39) {
      this.cell.position.x =
        (window.innerWidth + board_width) / 2 -
        board_lineStyle -
        this.cell.width / 2;
    }

    if (
      (key.keyCode === 65 || key.keyCode === 37) &&
      this.cell.position.x >=
        (window.innerWidth - board_width) / 2 +
          board_lineStyle +
          this.cell.width / 2 +
          cell_move
    ) {
      this.cell.position.x -= cell_move;
    } else if (key.keyCode === 65 || key.keyCode === 37) {
      this.cell.position.x =
        (window.innerWidth - board_width) / 2 +
        board_lineStyle +
        this.cell.width / 2;
    }
  }
  onKeyUp() {
    this.cell.velocity = 0;
    console.warn(45);
  }
}
