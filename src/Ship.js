// src/ship.js

export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  isHit() {
    console.log("Hit!");
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
