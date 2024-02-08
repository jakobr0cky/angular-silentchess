import { Routes } from '@angular/router';
import { MultiplayerGameComponent } from './multiplayer-game/multiplayer-game.component';
import { ChessboardComponent } from './chessboard/chessboard.component';

export const routes: Routes = [
    { path: '', component: ChessboardComponent},
    { path: 'game/:id', component: MultiplayerGameComponent},
];
