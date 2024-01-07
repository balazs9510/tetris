import { Block } from "./tetromino";

export class Cell {
  public block: Block | null = null;
  constructor(
    public row: number,
    public col: number,
    public isBorder: boolean,
    public isHidden: boolean
  ) {}
}
