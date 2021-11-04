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

export const checkCellBounds = (ball, cell, simbol) => {
  console.log(ball.position.x - ball.width / 2);
  console.log(
    cell.position.x + cell.width / 2 - cell.velocity - Math.abs(ball.velocity.x)
  );

  if (
    simbol * (ball.position.y + simbol * (ball.width / 2)) <=
      simbol *
        (cell.position.y -
          (simbol * cell.height) / 2 +
          simbol * Math.abs(ball.velocity.y)) &&
    ball.position.x - ball.width / 2 <=
      cell.position.x + cell.width / 2 + cell.velocity &&
    ball.position.x + ball.width / 2 >=
      cell.position.x - cell.width / 2 - cell.velocity
  ) {
    console.log(1);

    ball.velocity.y *= -1;
  } else if (
    ball.position.x - ball.width / 2 >=
    cell.position.x + cell.width / 2 - cell.velocity - Math.abs(ball.velocity.x)
  ) {
    ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
  } else if (
    ball.position.x + ball.width / 2 <=
    cell.position.x - cell.width / 2 + cell.velocity + Math.abs(ball.velocity.x)
  ) {
    ball.velocity.x = (Math.abs(ball.velocity.x) + cell.velocity) * -1;
  } else if (ball.position.x > cell.position.x) {
    console.log(4);

    ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
    ball.velocity.y = -simbol * Math.abs(ball.velocity.y);
  } else {
    console.log(5);

    ball.velocity.x = -Math.abs(ball.velocity.x) - cell.velocity;
    ball.velocity.y = -simbol * Math.abs(ball.velocity.y);
  }
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
