import { Component, Input } from '@angular/core';
import { Cell } from 'src/app/models/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css',
})
export class CellComponent {
  @Input() cell: Cell | undefined;

  
}
