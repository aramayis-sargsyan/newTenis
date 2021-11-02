import { Container, Graphics, LineStyle } from "pixi.js";
import { Cell } from "./cell";
import { Row } from "./pathLine";
import { ArenaConfig } from "../config";

export class ArenaBeckground extends Container {
  bgCell: Cell;
  wall: Row;
  constructor() {
    super();
  }

  buildBg() {
    const {
      board_width: cell_width,
      board_height: cell_height,
      board_lineStyle: cell_lineStyle,
    } = ArenaConfig;
    const bgCell = new Cell();
    bgCell._build(cell_width, cell_height, cell_lineStyle);
    bgCell.position.set(
      window.innerWidth / 2 + cell_lineStyle,
      window.innerHeight - cell_height / 2 + cell_lineStyle
    );
    bgCell.tint = 0x009334;
    this.addChild(bgCell);
  }

  buildRow() {
    const {
      board_lineStyle: cell_lineStyle,
      board_width: cell_width,
      board_height: cell_height,
      row_height,
    } = ArenaConfig;
    const row = new Row();
    row._build(row_height);
    row.moveTo(
      (window.innerWidth - cell_width) / 2 + cell_lineStyle,
      window.innerHeight - cell_height / 2
    );
    row.lineTo(
      (window.innerWidth + cell_width) / 2 - cell_lineStyle,
      window.innerHeight - cell_height / 2
    );
    row.tint = 0x009334;

    this.addChild(row);
  }
}
