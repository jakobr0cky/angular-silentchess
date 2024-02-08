import { ApplicationRef, Component, NgModule } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, withHashLocation } from '@angular/router';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { CommonModule, NgFor } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { routes } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { MultiplayerGameComponent } from './multiplayer-game/multiplayer-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,ChessboardComponent,CommonModule,NgFor,SocketIoModule,MultiplayerGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent {

  title = 'angular-silentchess';
  
}

