import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockfishService {

  constructor(makeMoveOnBoard: Function) {
    this.engine = new Worker('assets\\stockfish.js');

    // make engine ready
    this.sendCommand('uci');
    this.sendCommand('ucinewgame');
    this.sendCommand('isready');

    // set time with increment for each player to have
    this.sendCommand('wtime ' + this.timeControl.wtime + ' btime ' + this.timeControl.btime +
      ' winc ' + this.timeControl.winc + ' binc ' + this.timeControl.binc);

    this.engine.onmessage = (event:MessageEvent) => makeMoveOnBoard(event);
  }

  private engine = new Worker('assets\\stockfish.js');
  private timeControl = {
    wtime: 300000,  // in milliseconds
    btime: 300000, 
    winc: 5000,    
    binc: 5000    
  };

  private sendCommand(command: string) {
    this.engine.postMessage(command);
  }

  searchForMove(movesInFen: string) {
    this.sendCommand('position fen ' + movesInFen);
    this.sendCommand('go depth 5');
  }
}
