import { Graphics } from "pixi.js";
import { ArenaConfig } from "../config";

export class Ball extends Graphics {
  velocity: { x: number; y: number };
  const: { x: number; y: number };
  constructor() {
    super();
  }

  build() {
    const { ball_radius } = ArenaConfig;
    this.beginFill(0xffffff);
    this.drawCircle(0, 0, ball_radius);
    this.endFill();
  }

  setVelosity() {
    const { ball_velocity } = ArenaConfig;

    this.velocity = {
      x: ball_velocity.x,
      y: 0,
    };
  }
}
