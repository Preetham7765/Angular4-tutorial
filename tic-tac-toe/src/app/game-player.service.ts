import { Injectable } from '@angular/core';
import { Move } from './move';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GamePlayerService {

  X: string;
  O: string;
  empty: string;
  board
  size:number;


  constructor() { 
    console.log("calling constructor");
    this.X = 'X';
    this.O = 'O';
    this.board = [];
    //this.board[3][3] = [['_','_','_'],['_','_','_'],['_','_','_']]; 
    for(let i = 0 ; i<3; i++){
      this.board[i] = Array();
      for(let j=0; j<3; j++){
        this.board[i].push('_');
      }
    }
    this.size = 3;
  }


  private printBoard(board) {
    let line = ""
    for(let i = 0 ; i<3; i++){
      for(let j=0; j<3; j++){
        //console.log(board[i][j]);
        line += board[i][j] + "\t"
      }
      line+= '\n';
    }
    console.log(line);
  }

  evaluateBoard(): number {

    //check for horizontal matches
      for(let row = 0; row < this.size; row ++) {
        if (this.board[row][0] === this.board[row][1] &&
            this.board[row][1] === this.board[row][2]){
              if(this.board[row][0] === 'O')
                  return 10;
              else if(this.board[row][0] === 'X')
                  return -10;
        }                
      }

    //check for vertical matches
    for(let col = 0; col < this.size; col ++) {
      if (this.board[0][col] === this.board[1][col] &&
          this.board[1][col] === this.board[2][col]){
          if(this.board[0][col] === 'O')
                  return 10;
              else if(this.board[0][col] === 'X')
                  return -10;
            }
    }
    //check for diagonal matches
    if (this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2]) {
        if(this.board[0][0] === 'O')
          return 10;
        else if(this.board[0][0] === 'X')
          return -10;
    }
    

    if(this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]) {
        if(this.board[0][2] === 'O')
          return 10;
        else if(this.board[0][2] === 'X')
          return -10;
      }

    return 0
 }

  private minimax(depth: number, isMax: boolean): number {


    //this.printBoard(this.board);

    let bestScore = 0;
  

    let score = this.evaluateBoard()

    
    if(score === 10 || score === -10){

      return score;
    }

  
    if(this.isDraw()) {
      return 0;
    }   

    if(isMax) {
      bestScore = Number.NEGATIVE_INFINITY;
      for(let i = 0; i < this.size; i++) {
        for(let j = 0; j< this.size; j++) {
          if(this.board[i][j] === '_'){
            this.board[i][j] = 'O';
            bestScore = Math.max(bestScore,
                            this.minimax(depth + 1, !isMax))
            this.board[i][j] = '_';                            
          }
        }
      }
    }
    else {
      bestScore = Number.POSITIVE_INFINITY;
      for(let i = 0; i < this.size; i++) {
        for(let j = 0; j< this.size; j++) {
          if(this.board[i][j] === '_'){
            this.board[i][j] = 'X';
            bestScore = Math.min(bestScore,
                        this.minimax(depth + 1, !isMax))
            this.board[i][j] = '_';            
          }
        }
      }
    }
    return bestScore;
  }

  getCellState(row: number, col: number): string {

    //console.log(row, col)
    return this.board[row][col];

  }

  setCellState(row: number, col: number, val: string) {

     this.board[row][col] = val;

  }

  isDraw(): boolean {
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        if(this.board[i][j] === '_') {
          return false;
        }
      }
    }
    return true;
  }

  findNextMove(): Move {

    console.log("Find next move");

    let globalmaxima = Number.NEGATIVE_INFINITY
    let res = new Move();

    for(let i = 0; i < this.size; i++){
      for(let j = 0; j < this.size; j++){
        if(this.board[i][j] === "_") {
          console.log("j" + j + " " + this.board[i][j]);
          this.board[i][j] = 'O';
          console.log("board setting i and j" + i + j);
          this.printBoard(this.board)
          //console.log(this.board)
          
          let localmaxima = this.minimax(0,false);
          console.log(localmaxima)
          
          this.board[i][j] = '_';
          
          if(localmaxima > globalmaxima){
            res.row =  i;
            res.col = j;
            globalmaxima = localmaxima; 
          }
        }
      }

    }
    //this.board[res.row][res.col] = this.O;
    console.log("printing board:", globalmaxima);
    console.log(this.board)
    return res;
  }

}
