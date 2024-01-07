import { Board } from './board';
import { Block, Tetromino, TetrominoTemplate } from './tetromino';

export class Game {
  public board: Board = new Board();
  public score: number = 0;
  public currentTetromino: Tetromino | null = null;
  public setBlocks: Block[] = [];
  public lose: boolean = false;

  tickOne() {
    if (this.lose) return;
    if (this.currentTetromino) {
      this.moveDownTetromino();
    } else {
      this.spawnNew();
    }
    this.drawBlock();
    this.checkForLose();
  }

  moveLeftTetromino(){
    let collisonLeft = this.currentTetromino.blocks.find(b => b.col - 1 == 0);
    if (collisonLeft) return;

    this.currentTetromino.blocks.forEach(b => b.col--);
    this.drawBlock();
  }

  moveRightTetromino(){
    let collisonLeft = this.currentTetromino.blocks.find(b => b.col - 1 == 0);
    if (collisonLeft) return;

    this.currentTetromino.blocks.forEach(b => b.col++);
    this.drawBlock();
  }

  private spawnNew() {
    let newCurrent =
      baseTetrominoes[Math.floor(Math.random() * baseTetrominoes.length)];
    this.currentTetromino = new Tetromino(newCurrent);
    // Possible spawn area [1,board.width]
    console.log(this.board.width);

    let colNumber =
      Math.floor(
        Math.random() * (this.board.width - newCurrent.pattern[0].length)
      ) + 2;
    console.log(colNumber);

    this.currentTetromino.create(colNumber);
  }

  private moveDownTetromino(): void {
    this.currentTetromino.blocks.forEach((b) => {
      b.row += 1;
    });
    this.checkCollision();
  }

  private checkCollision(): void {
    let hasCollision = false;
    for (let i = 0; i < this.currentTetromino.blocks.length; i++) {
      let block = this.currentTetromino.blocks[i];
      hasCollision = block.row == this.board.height + 4; // last row
      if (!hasCollision) {
        hasCollision = this.checkCollisonWithOtherBlocks(block);
      }
      if (hasCollision) {
        console.log('collide');
        break;
      }
    }

    if (!hasCollision) return;
    this.currentTetromino.blocks.forEach((block) => {
      this.setBlocks.push(block);
    });
    console.log(this.setBlocks);

    this.currentTetromino = null;
  }

  private drawBlock() {
    let allBlocks = this.setBlocks;
    if (this.currentTetromino)
      allBlocks = allBlocks.concat(this.currentTetromino.blocks);
    for (let row = 0; row < this.board.cells.length; row++) {
      for (let col = 0; col < this.board.cells[row].length; col++) {
        let matchingBlock =
          allBlocks.find((x) => x.row == row && x.col == col) ?? null;
        this.board.cells[row][col].block = matchingBlock;
      }
    }
  }

  private checkCollisonWithOtherBlocks(block: Block): boolean {
    return (
      this.setBlocks.find(
        (b) => b.col == block.col && b.row == block.row + 1
      ) != undefined
    );
  }

  private checkForLose(): void {
    let overflow = this.setBlocks.find((b) => b.row < 5);
    this.lose = overflow != null;
  }
}

export const baseTetrominoes: TetrominoTemplate[] = [
  new TetrominoTemplate('skyblue', [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ]),
  new TetrominoTemplate('blue', [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 1],
  ]),
  new TetrominoTemplate('orange', [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 1],
  ]),
  new TetrominoTemplate('yellow', [
    [1, 1],
    [1, 1],
  ]),
  new TetrominoTemplate('green', [
    [0, 1, 1],
    [1, 1, 0],
  ]),
  new TetrominoTemplate('purple', [
    [1, 1, 1],
    [0, 1, 0],
  ]),
  new TetrominoTemplate('red', [
    [1, 1, 0],
    [0, 1, 1],
  ]),
];
