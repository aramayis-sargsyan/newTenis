import { Container, Graphics, LineStyle } from "pixi.js";
import { Cell } from "./cell";
import { Row } from "./pathLine";
import { ArenaConfig } from "../config";
import { Ball } from "./ball";
import { checkWorldBounds } from "./arena-utills";

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
  }

  moveBall() {
    const { board_height: cell_height, ball_radius } = ArenaConfig;
    this.ball.position.set(
      (this.ball.position.x += this.ball.velocity.x),
      (this.ball.position.y += this.ball.velocity.y)
    );

    if (this.ball.position.y === window.innerHeight - cell_height / 2) {
      this.count = 1;
    }

    checkWorldBounds(this.ball);
  }

  onKeyDown(key) {
    if (key.keyCode === 68 || key.keyCode === 39) {
      this.cell.position.x += 2;
    }
    if (key.keyCode === 65 || key.keyCode === 37) {
      this.cell.position.x -= 2;
    }
  }
}
