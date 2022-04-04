import { Component, OnInit } from '@angular/core';
import { connect, io, Socket } from 'socket.io-client';
import { ChatroomService } from '../chatroom.service';
import { WebSocketService } from '../web-socket.service';
import * as socketIo from 'socket.io-client';
import {FormsModule} from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  itemArray:any = [];
  

  constructor(public webSocket: WebSocketService, public chatroomService: ChatroomService,private router: Router, private route: ActivatedRoute) {
    
    //this.recieveChatroomMessage();
    this.webSocket.receiveMessages().subscribe(data => this.itemArray.push(data));

  }
  public message = "";
  async ngOnInit() {
    this.message = "";
    this.route.paramMap.subscribe((params: ParamMap)  =>  {
      const id = params.get('id');
      this.chatroomService.roomId = id;
    });
    await this.chatroomService.getUserid();
    await this.webSocket.joinRoom();
    await this.chatroomService.getChatroomName();
    await this.chatRoomConversations();
  }
  ngOnDestroy(): void {
    this.webSocket.leaveRoom();
  }
  
  sendingMessage(){
    if(this.message!=""){
      this.webSocket.chatRoomMessage(this.message);
      this.message = "";
    }
   
  }
  
  // recieveChatroomMessage(){
    // this.webSocket.socket.on('chatroomMessage',(data:any) => {
    //   this.itemArray.push(data);
    
  //})
  // }

  async chatRoomConversations(){
    const chatroomconversation = await this.webSocket.getAllMessagesfromRoom().subscribe(
      res => {
        this.itemArray = res;
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 || err.status === 500){
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
  
  leaveRoom(){
    this.router.navigate(['/dashboard']);
  }
}
