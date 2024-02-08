import { CommonModule, HashLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Router, provideRouter } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StockfishService } from '../stockfish.service';
import { ChessboardService } from '../chessboard.service';
  
@Component({
  selector: 'app-chessboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatSnackBarModule],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.scss',
  providers:[ChessboardService]
})

export class ChessboardComponent {

  constructor(public router:  Router, public snackBar: MatSnackBar,) { }

  private stockishService!: StockfishService;
  protected chessboardService!:ChessboardService;
  protected boardGenerationArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  protected moves: string[] = [];
  protected isBlindMode: boolean = false;
  protected isEngineGame: boolean = true;

  get board() {
    return this.chessboardService.getBoard();
  }

  public get getMoves(){
    return this.moves;
  }
  
  ngOnInit() {
    this.chessboardService = new ChessboardService(this.snackBar);
    // cant do this in constructor because handEngineMessage doesnt exist when constructor is called
    this.stockishService = new StockfishService((event: MessageEvent) => { this.handleEngineMessage(event) });
  }

  onChangeBlindmodeButton() {
    this.isBlindMode = !this.isBlindMode;
  }

  createGame() {
    const uuid = uuidv4();
    this.router.navigate(['./', uuid]);
  }

  public doEngineMove(){
    this.stockishService.searchForMove(this.chessboardService.getFen());
  }

  public doPlayerMove(move: string | { from: string, to: string, promotion?: string }){ // for multiplayer component to override
    return this.chessboardService.makeMoveOnBoard(move);
  }

  public getSquareInfo(x: number, y: number) {
    return this.chessboardService.getBoard()[x][y];
  }
  
  public isBlackSquare(row: number, col: number) {
    return (row + col) % 2 === 1;
  }

  public getPieceImage(x: number, y: number) {
    var squareInfo = this.getSquareInfo(x, y);
    return `assets\\pieces\\${squareInfo?.color}${squareInfo?.type.toUpperCase()}.svg`;
  }

  public speakMove(move:string){
    const utterance = new SpeechSynthesisUtterance(move);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
  }

  public updateMoves() {
    var alleMoves = this.chessboardService.getHistory();
    this.moves.push(alleMoves[alleMoves.length - 1]);
  }

  public handleEngineMessage(event: MessageEvent) {
    var message = event.data;

    if (message.startsWith('bestmove')) {

      var bestMove = message.split(' ')[1];
      var squareFrom = bestMove.substring(0, 2);
      var squareTo = bestMove.substring(2, 4);
      var promotion = bestMove.substring(4, 5);

      if (bestMove.length > 4) {
        this.chessboardService.makeMoveOnBoard({ from: squareFrom, to: squareTo, promotion: promotion });
      }
      else {
        this.chessboardService.makeMoveOnBoard({ from: squareFrom, to: squareTo });
      }
      this.updateMoves();
      
      var lastMoveSAN = this.chessboardService.getHistory();
      this.speakMove(lastMoveSAN[lastMoveSAN.length - 1]);
    }
  }

  onMoveEnter($event: Event) {
    const inputElement = $event.target as HTMLInputElement;

    if(this.chessboardService.getHumanColor() != this.chessboardService.getCurrentPlayer()){
      let snackBarRef = this.snackBar.open('Not your turn yet!', 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      inputElement.value = '';
      return;
    }
    
   
    var wasMoveLegal =  this.doPlayerMove(inputElement.value);

    if (wasMoveLegal) {
      this.updateMoves();

      if(this.isEngineGame)this.doEngineMove();
    }
    else {
      let snackBarRef = this.snackBar.open('Wrong move input', 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    inputElement.value = '';
  }

  public dropList(event: CdkDragDrop<any>, targetRow: number, targetColumn: number) {
    const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    var sourceCoordinates = event.item.data.split(',');
    var notation1 = alpha[sourceCoordinates[1]] +(8- sourceCoordinates[0]);
    var notation2 = `${alpha[targetColumn]}${8 - targetRow}`;
    
    var promotion
    if(this.getSquareInfo(sourceCoordinates[0],sourceCoordinates[1])?.type == 'p' && this.boardGenerationArray[targetRow] == 0){
      promotion = 'q';
    }

    var wasMoveLegal = this.doPlayerMove({from:notation1,to:notation2,promotion:promotion!});

    if (wasMoveLegal) {
      this.updateMoves();
      if(this.isEngineGame)this.doEngineMove();
    }
  }
}


