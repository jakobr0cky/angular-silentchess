import { Component, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { CommonModule, NgFor } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChessboardComponent,CommonModule,NgFor,SocketIoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent {
  title = 'angular-silentchess';

  
}
