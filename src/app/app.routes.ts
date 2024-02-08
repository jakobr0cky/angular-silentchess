import { Routes, withHashLocation } from '@angular/router';
import { MultiplayerGameComponent } from './multiplayer-game/multiplayer-game.component';
import { ChessboardComponent } from './chessboard/chessboard.component';

export const routes: Routes = [
    {   path: '', component: ChessboardComponent,
        // children: [
        //     { path: ":id", component: MultiplayerGameComponent, title:"HAAAAAAAAAALOOOOOOO"},
        // ]
    },
    { path: ':id', component: MultiplayerGameComponent},
];
