import { ArenaConfig } from "../config";

export const checkWorldBounds = (ball) => {
  const {
    board_lineStyle: cell_lineStyle,
    board_width: board_width,
    board_height: board_height,
  } = ArenaConfig;
  if (
    ball.position.x >=
    (window.innerWidth + board_width) / 2 - cell_lineStyle - ball.width / 2
  ) {
    ball.velocity.x = -Math.abs(ball.velocity.x);
  } else if (
    ball.position.x <=
    (window.innerWidth - board_width) / 2 + cell_lineStyle + ball.width / 2
  ) {
    ball.velocity.x = Math.abs(ball.velocity.x);
  }
};

import { boxCircle } from "intersects";

export const ballCell = (xc, yc, rc, xb, yb, wb, hb) => {
  return boxCircle(xb, yb, wb, hb, xc, yc, rc);
};

export const checkYourCellBounds = (ball, cell) => {
  if (
    ball.position.y + ball.width / 2 <=
      cell.position.y - cell.height / 2 + Math.abs(ball.velocity.y) &&
    ball.position.x - ball.width / 2 <=
      cell.position.x + cell.width / 2 + cell.velocity &&
    ball.position.x + ball.width / 2 >=
      cell.position.x - cell.width / 2 - cell.velocity
  ) {
    ball.velocity.y *= -1;
  } else if (
    ball.position.x - ball.width / 2 >=
    cell.position.x + cell.width / 2 - cell.velocity + ball.velocity.x
  ) {
    ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
  } else if (
    ball.position.x + ball.width / 2 <=
    cell.position.x - cell.width / 2 + cell.velocity + ball.velocity.x
  ) {
    ball.velocity.x = (Math.abs(ball.velocity.x) + cell.velocity) * -1;
  } else if (ball.position.x > cell.position.x) {
    ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
    ball.velocity.y = -Math.abs(ball.velocity.y);
  } else {
    ball.velocity.x = -Math.abs(ball.velocity.x) - cell.velocity;
    ball.velocity.y = -Math.abs(ball.velocity.y);
  }
};

export const checkBotCellBounds = (ball, cell) => {
  ball.velocity.y = Math.abs(ball.velocity.y);
  // console.log(ball.position.x - ball.width / 2);
  // console.log(cell.position.x + cell.width / 2 + cell.velocity);
  // if (
  //   ball.position.y + ball.width / 2 <=
  //     cell.position.y - cell.height / 2 + Math.abs(ball.velocity.y) &&
  //   ball.position.x - ball.width / 2 <=
  //     cell.position.x + cell.width / 2 + cell.velocity &&
  //   ball.position.x + ball.width / 2 >=
  //     cell.position.x - cell.width / 2 - cell.velocity
  // ) {
  //   ball.velocity.y *= -1;
  // } else if (
  //   ball.position.x - ball.width / 2 >=
  //   cell.position.x + cell.width / 2 - cell.velocity + ball.velocity.x
  // ) {
  //   ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
  // } else if (
  //   ball.position.x + ball.width / 2 <=
  //   cell.position.x - cell.width / 2 + cell.velocity + ball.velocity.x
  // ) {
  //   ball.velocity.x = (Math.abs(ball.velocity.x) + cell.velocity) * -1;
  // } else if (ball.position.x > cell.position.x) {
  //   ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
  //   ball.velocity.y = -Math.abs(ball.velocity.y);
  // } else {
  //   ball.velocity.x = -Math.abs(ball.velocity.x) - cell.velocity;
  //   ball.velocity.y = -Math.abs(ball.velocity.y);
  // }
};
export const moveYourCell = (key, yourCell, left, right) => {
  const { board_width, board_lineStyle, cell_move } = ArenaConfig;
  yourCell.velocity = cell_move;

  if (
    key.keyCode === right &&
    yourCell.position.x <=
      (window.innerWidth + board_width) / 2 -
        board_lineStyle -
        yourCell.width / 2 -
        cell_move
  ) {
    yourCell.position.x += cell_move;
  } else if (key.keyCode === right) {
    yourCell.position.x =
      (window.innerWidth + board_width) / 2 -
      board_lineStyle -
      yourCell.width / 2;
  }

  if (
    key.keyCode === left &&
    yourCell.position.x >=
      (window.innerWidth - board_width) / 2 +
        board_lineStyle +
        yourCell.width / 2 +
        cell_move
  ) {
    yourCell.position.x -= cell_move;
  } else if (key.keyCode === left) {
    yourCell.position.x =
      (window.innerWidth - board_width) / 2 +
      board_lineStyle +
      yourCell.width / 2;
  }
};

export const moveBotCell = (key, yourCell, left, right) => {
  const { board_width, board_lineStyle, cell_move } = ArenaConfig;
  yourCell.velocity = cell_move;

  if (
    key.keyCode === right &&
    yourCell.position.x <=
      (window.innerWidth + board_width) / 2 -
        board_lineStyle -
        yourCell.width / 2 -
        cell_move
  ) {
    yourCell.position.x += cell_move;
  } else if (key.keyCode === right) {
    yourCell.position.x =
      (window.innerWidth + board_width) / 2 -
      board_lineStyle -
      yourCell.width / 2;
  }

  if (
    key.keyCode === left &&
    yourCell.position.x >=
      (window.innerWidth - board_width) / 2 +
        board_lineStyle +
        yourCell.width / 2 +
        cell_move
  ) {
    yourCell.position.x -= cell_move;
  } else if (key.keyCode === left) {
    yourCell.position.x =
      (window.innerWidth - board_width) / 2 +
      board_lineStyle +
      yourCell.width / 2;
  }
};
