import { Component, OnInit } from '@angular/core';
import { GamePlayerService } from '../game-player.service';
import { Move } from '../move';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  
  size = [0,1,2];
  nextMove: Move

  constructor(private playerService: GamePlayerService) { 


  }


  getCellState(row, col) {
    return this.playerService.getCellState(row, col);
  }

  handleClick(row: number, col: number) {

    let cur_value = this.playerService.getCellState(row, col);
    let ret_row, ret_col;
    if(cur_value == '_'){
      console.log("row " + row + "col " + col)
      this.playerService.setCellState(row, col, 'X');
      if (this.playerService.evaluateBoard() == -10)
          alert("You Win!!!");

      this.nextMove = this.playerService.findNextMove();
      this.playerService.setCellState(this.nextMove.row, this.nextMove.col, 'O');
      if (this.playerService.evaluateBoard() == 10)
          alert("Computer Wins!!!");
      
      console.log(this.nextMove.row, this.nextMove.col);
      
    }

  }

   
}
