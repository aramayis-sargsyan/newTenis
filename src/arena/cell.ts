import { Graphics } from "pixi.js";

export class Cell extends Graphics {
  velocity: number;
  constructor() {
    super();
  }

  _build(width, height, lineStyle) {
    this.lineStyle(lineStyle, 0x222222, 1, 1);
    this.beginFill(0xffffff);

    this.drawRect(0, 0, width - 2 * lineStyle, height - 2 * lineStyle);
    this.endFill();
    this.pivot.set(this.width / 2, this.height / 2);
    this.velocity = 0;
  }
}
