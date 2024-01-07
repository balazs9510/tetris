import { Cell } from './cell';

export class Board {
  public cells: Cell[][] = [];

  constructor(public width: number = 10, public height: number = 20) {
    width += 2;
    height += 6; // hidden row for spawning tetrominoes
    for (let i = 0; i < height; i++) {
      this.cells[i] = [];

      for (let j = 0; j < width; j++) {
        let isHidden = i < 4;
        let isBorder =
          i == 4 ||
          i == height - 1 ||
          ((j == 0 || j == width - 1) && !isHidden);
        this.cells[i][j] = new Cell(i, j, isBorder, isHidden);
      }
    }
  }
}
