// src/ship.js
import { ConcatenationScope } from "webpack";
import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = [];
    this.createBoard();
    this.boardHits = [];
    this.boardOccupiedCoords = [];
  }

  createBoard() {
    for (let i = 0; i < 10; i++) {
      const row = []; // Create a blank row

      for (let j = 0; j < 10; j++) {
        row.push(null);
      }

      this.board.push(row); // Add the completed row to our board
    }

    console.log(`${this.board}`);
  }

  // Direction will be either Horizontal, I.E. Right from the starting Coord or Vertical, I.E. Down from the starting Coord
  spawnShip(length, direction, coord) {
    console.log("Ship Spawned!");
    const ship = new Ship(length);
    const [row, col] = coord;

    if (direction === "horizontal") {
      // 1. The Inspector Loop
      for (let j = 0; j < length; j++) {
        const checkCol = col + j;
        if (checkCol >= 10 || this.board[row][checkCol] !== null) {
          return false; // Abort the whole function immediately!
        }
      }
      // 2. The Builder Loop (Only runs if the Inspector didn't abort)
      for (let j = 0; j < length; j++) {
        this.board[row][col + j] = ship;
      }
    } else if (direction === "vertical") {
      // 1. The Inspector Loop
      for (let j = 0; j < length; j++) {
        const checkRow = row + j;
        if (checkRow >= 10 || this.board[checkRow][col] !== null) {
          return false; // Abort the whole function immediately!
        }
      }
      // 2. The Builder Loop (Only runs if the Inspector didn't abort)
      for (let j = 0; j < length; j++) {
        this.board[row + j][col] = ship;
      }
    }
  }

  receiveAttack(Coord) {
    const [row, col] = Coord;

    if (this.boardHits.some((hit) => hit[0] === row && hit[1] === col)) {
      return; // Stop the function early if we already shot here
    }

    //  Add to Hit Coordinates and Process Hit/Miss
    this.boardHits.push(Coord);
    const target = this.board[row][col];
    if (target !== null) {
      target.hit();
      console.log("Broadside! 💥");
    } else {
      console.log("Splash! 🌊");
    }
  }

  checkGameOver() {
    // If all of boardOccupiedCoords is in boardHits, Game Over
  }
}
