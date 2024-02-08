import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
  
})
export class ChessboardService {

  constructor(private snackBar:MatSnackBar ) { 
    this.chess = new Chess();
  }

  private chess:Chess;
  private currentPlayer: String = 'w';
  private humanColor: String = this.currentPlayer.valueOf();

  public getCurrentPlayer() {
    return this.currentPlayer;
  }

  public setCurrentPlayer(color: string) {
    this.currentPlayer = color;
  }

  public getHumanColor() {
    return this.humanColor;
  }

  public setHumanColor(color: string) {
    this.humanColor = color;
  }

  public getHistory() {
    return this.chess.history();
  }

  public getFen() {
    return this.chess.fen();
  }

  public getBoard() {
    return this.chess.board();
  }

  public makeMoveOnBoard(move: string | { from: string, to: string, promotion?: string }) {
    try {
      if (typeof move === 'string') {
        this.chess.move(move);
      }
      else {
        this.chess.move({ from: move.from, to: move.to, promotion: move.promotion });
      }
    } 
    catch (error) {
      // move was illegal
      return false;
    }

    this.currentPlayer = this.currentPlayer == 'w' ? 'b' : 'w';
    if (this.chess.isGameOver()) {
      let snackBarRef = this.snackBar.open('Checkmate!', 'close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    return true;
  }
}
