import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GamePlayerService} from './game-player.service';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GamePlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
