import { ArenaConfig } from "../config";
import { boxCircle } from "intersects";

export const moveBall = (ball) => {
  ball.position.set(
    (ball.position.x += ball.velocity.x),
    (ball.position.y += ball.velocity.y)
  );
};

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

export const ballCell = (xc, yc, rc, xb, yb, wb, hb) => {
  return boxCircle(xb, yb, wb, hb, xc, yc, rc);
};

export const checkCellBounds = (ball, cell, simbol) => {
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
    ball.velocity.x = Math.abs(ball.velocity.x) + cell.velocity;
    ball.velocity.y = -simbol * Math.abs(ball.velocity.y);
  } else {
    ball.velocity.x = -Math.abs(ball.velocity.x) - cell.velocity;
    ball.velocity.y = -simbol * Math.abs(ball.velocity.y);
  }
};

export const moveCell = (left, right, cell) => {
  const { board_width, board_lineStyle, cell_move } = ArenaConfig;
  cell.velocity = cell_move;

  if (
    right &&
    cell.position.x <=
      (window.innerWidth + board_width) / 2 -
        board_lineStyle -
        cell.width / 2 -
        cell_move
  ) {
    cell.position.x += cell_move;
  } else if (right) {
    cell.position.x =
      (window.innerWidth + board_width) / 2 - board_lineStyle - cell.width / 2;
  }

  if (
    left &&
    cell.position.x >=
      (window.innerWidth - board_width) / 2 +
        board_lineStyle +
        cell.width / 2 +
        cell_move
  ) {
    cell.position.x -= cell_move;
  } else if (left) {
    cell.position.x =
      (window.innerWidth - board_width) / 2 + board_lineStyle + cell.width / 2;
  }
};

export const moveBotCell = (start, ball, botCell) => {
  const { board_width, board_lineStyle, cell_move } = ArenaConfig;
  if (start === "bot") {
    if (ball.position.x >= botCell.position.x && ball.velocity.y < 0) {
      if (
        botCell.position.x <
        (window.innerWidth + board_width) / 2 -
          board_lineStyle -
          botCell.width / 2 -
          cell_move
      ) {
        botCell.position.x += Math.abs(ball.velocity.x) * 0.9;
      } else {
        botCell.position.x =
          (window.innerWidth + board_width) / 2 -
          board_lineStyle -
          botCell.width / 2;
      }
    } else if (ball.position.x < botCell.position.x && ball.velocity.y < 0) {
      if (
        botCell.position.x >
        (window.innerWidth - board_width) / 2 +
          board_lineStyle +
          botCell.width / 2 +
          cell_move
      ) {
        botCell.position.x -= Math.abs(ball.velocity.x) * 0.9;
      } else {
        botCell.position.x =
          (window.innerWidth - board_width) / 2 +
          board_lineStyle +
          botCell.width / 2;
      }
    }
  }
};
