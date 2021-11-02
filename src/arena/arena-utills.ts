import { ArenaConfig } from "../config";

export const checkWorldBounds = (ball) => {
  const {
    board_lineStyle: cell_lineStyle,
    board_width: cell_width,
    board_height: cell_height,
  } = ArenaConfig;
  if (
    ball.position.x >=
    (window.innerWidth + cell_width) / 2 - cell_lineStyle - ball.width / 2
  ) {
    ball.velocity.x = -Math.abs(ball.velocity.x);
  } else if (
    ball.position.x <=
    (window.innerWidth - cell_width) / 2 + cell_lineStyle + ball.width / 2
  ) {
    ball.velocity.x = Math.abs(ball.velocity.x);
  } else if (
    ball.position.y >=
    window.innerHeight - ball.height / 2 - cell_lineStyle
  ) {
    ball.velocity.y = -Math.abs(ball.velocity.y);
  } else if (
    ball.position.y <=
    window.innerHeight - cell_height + ball.width / 2 + cell_lineStyle
  ) {
    ball.velocity.y = Math.abs(ball.velocity.y);
  }
};

import { boxCircle } from "intersects";

export const ballCell = (xc, yc, rc, xb, yb, wb, hb) => {
  return boxCircle(xb, yb, wb, hb, xc, yc, rc);
};

export const checkCellBounds = (ball, cell) => {
  if (
    ball.position.y + ball.width / 2 >= cell.position.y - cell.width / 2 &&
    ball.position.x - ball.width / 2 <=
      cell.position.x + cell.width / 2 + cell.velocity &&
    ball.position.x + ball.width / 2 >=
      cell.position.x - cell.width / 2 - cell.velocity
  ) {
    console.log(1);

    ball.velocity.y *= -1;
  } else if (
    ball.position.x - ball.width / 2 <=
      cell.position.x + cell.width / 2 + cell.velocity ||
    ball.position.x + ball.width / 2 >=
      cell.position.x - cell.width / 2 - cell.velocity
  ) {
    console.log(2);
    ball.velocity.x *= -1;
  }

  // if (
  //   ball.position.x - ball.width / 2 <= cell.position.x + cell.width / 2 &&
  //   ball.position.y + ball.width / 2 > cell.position.y - cell.height / 2
  // ) {
  //   console.log(7);
  //   console.log(ball.position.y + ball.width / 2);
  //   console.log(cell.position.y - cell.width / 2 + 7);

  //   ball.velocity.x *= -1;
  // } else if (
  //   ball.position.x + ball.width / 2 >= cell.position.x + cell.width / 2 &&
  //   ball.position.y > cell.position.y - cell.height / 2
  // ) {
  //   console.log(17);
  //   ball.velocity.x *= -1;
  // } else {
  //   ball.position.y = cell.position.y - cell.height / 2 - ball.width / 2;
  //   ball.velocity.y *= -1;
  // }
};
