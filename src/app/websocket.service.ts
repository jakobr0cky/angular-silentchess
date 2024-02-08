import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    private webSocket: Socket;
    constructor() {
        this.webSocket = new Socket({
            url: "https://legendary-buttercream-3e2e67.netlify.app",
            options: {},
        });

        this.webSocket.on('move',()=> {
            console.log('hallo');
        })
    }

    // this method is used to start connection/handhshake of socket with server
    joinRoom(gameId:string){
        this.webSocket.emit('joinRoom',gameId);
    }

    getObserver(event:string): Observable<any> {
        return this.webSocket.fromEvent(event);
    }

    makeMove(move:Object){
        this.webSocket.emit('sendMove',move);
    }

    sendBlindMode(isBlindMode:boolean){
        this.webSocket.emit('sendBlindMode',isBlindMode);
    }

    // this method is used to end web socket connection
    disconnectSocket() {
        this.webSocket.disconnect();
    }
}
