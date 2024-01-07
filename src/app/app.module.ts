import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BoardComponent } from './game/board/board.component';
import { GameComponent } from './game/game.component';
import { CellComponent } from './game/cell/cell.component';
const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'new-game', component: GameComponent },
];
@NgModule({
  declarations: [AppComponent, MenuComponent, BoardComponent, GameComponent, CellComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule,FormsModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
