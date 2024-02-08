import { Component, inject } from '@angular/core';
import { ChessboardComponent } from "../chessboard/chessboard.component";
import { ActivatedRoute, Router} from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { CommonModule, NgComponentOutlet} from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-multiplayer-game',
  standalone: true,
  templateUrl: './multiplayer-game.component.html',
  styleUrl: './multiplayer-game.component.scss',
  imports: [ChessboardComponent, CommonModule, NgComponentOutlet, DragDropModule,MatProgressSpinnerModule,MatSnackBarModule]
})
export class MultiplayerGameComponent extends ChessboardComponent {

  constructor(public activatedRoute: ActivatedRoute, private socketService: WebsocketService,private tempSnack: MatSnackBar) {
    super(new Router(),tempSnack);
    activatedRoute = inject(ActivatedRoute);
    this.isEngineGame = false;
  }

  gameId: string | undefined;
  socketId: string | undefined;
  allPlayersJoined: boolean = false;

  ngAfterViewInit() {
    this.joinRoom();
    this.subscribeToSetPlayer();
    this.subscribeToJoined();
    this.subscribeToReceiveMove();
    this.subscribeToReceiveBlindMode();
}

private subscribeToSetPlayer(): void {
    const observableSetPlayer = this.socketService.getObserver('setPlayer');
    observableSetPlayer.subscribe((player: number) => {
        if (player === 1) {
            this.chessboardService.setHumanColor('w');
        } else {
            this.chessboardService.setHumanColor('b');
            this.boardGenerationArray = this.boardGenerationArray.reverse();
        }
    });
}

private subscribeToJoined(): void {
    const observableJoined = this.socketService.getObserver('joined');
    observableJoined.subscribe((playerCount: number) => {
        this.allPlayersJoined = playerCount === 2;
    });
}

private subscribeToReceiveMove(): void {
    const observableReceiveMove = this.socketService.getObserver('receiveMove');
    observableReceiveMove.subscribe((move: any) => {
        if (typeof move === 'string') {
            console.log('move rec');
            console.log('move'+move)
            this.chessboardService.makeMoveOnBoard(move);
            this.speakMove(move);
        } else {
            this.chessboardService.makeMoveOnBoard({ from: move.from, to: move.to });
        }
        this.updateMoves();
    });
}

private subscribeToReceiveBlindMode(): void {
    const observableReceiveBlindMode = this.socketService.getObserver('receiveBlindMode');
    observableReceiveBlindMode.subscribe((blindMode: boolean) => {
        this.isBlindMode = blindMode;
    });
}

  override onChangeBlindmodeButton(): void {
    this.isBlindMode = !this.isBlindMode;
    this.socketService.sendBlindMode(this.isBlindMode);
  }

  public override doPlayerMove(move: string | { from: string, to: string, promotion?: string }): boolean {
    var isLegalMove = this.chessboardService.makeMoveOnBoard(move);
    if(isLegalMove){
      if (typeof move === 'string') {
        this.socketService.makeMove(move);
      }
      else {
        this.socketService.makeMove({from:move.from,to:move.to});
      }
    }
    return isLegalMove;
  }
  
  joinRoom() {
    this.socketService.joinRoom(this.activatedRoute.snapshot.params['id']);
  }
}
