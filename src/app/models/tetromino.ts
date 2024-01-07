export class Tetromino {
  public blocks: Block[] = [];
  constructor(public template: TetrominoTemplate) {}

  create(colNumber: number = 1) {
    let pattern = this.template.pattern;
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col]) {
          this.blocks.push({
            col: colNumber + col,
            row: row,
            color: this.template.color,
          });
        }
      }
    }
  }
}

export class TetrominoTemplate{
  constructor(public color: string, public pattern: number[][]) {
  }
}

export class Block {
  public col: number = 0;
  public row: number = 0;
  public color: string = '';
}
