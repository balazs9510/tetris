import { Component, HostListener, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { Key } from 'ts-keycode-enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  speed: number = 100;
  interval: any;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.logic();
    }, this.speed);
  }

  onSpeedChange() {
    console.log(this.speed);

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.logic();
    }, 1000 - this.speed);
  }

  logic() {
    this.game.tickOne();
  }
  reset() {
    this.game = new Game();
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    console.log(event.key);

    switch (event.key) {
      case 'ArrowLeft': {
        this.game.moveLeftTetromino();
        break;
      }
      case 'ArrowRight': {
        this.game.moveRightTetromino();
        break;
      }
    }
  }
  onKeydown(event: any) {
    console.log('asd');

    if (event.key === Key.LeftArrow) {
      this.game.moveLeftTetromino();
    }
    event.stopPropogation();
    event.preventDefault();
  }
}
