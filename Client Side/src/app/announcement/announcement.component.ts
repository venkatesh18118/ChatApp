import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomService } from '../chatroom.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  public announcementMessage = "";
  announcementArray:any = [];
  constructor(private webSocket:WebSocketService, private router: Router, private chatroomService: ChatroomService) { 
    this.webSocket.receiveAnnouncementMessages().subscribe(data => this.announcementArray.push(data));

  }

  async ngOnInit() {
    await this.chatroomService.getUserid();
    await this.announcementConversations();
  }

  sendingMessage(){
    if(this.announcementMessage!=""){
      this.webSocket.announcementMessage(this.announcementMessage);
      this.announcementMessage = "";
    }
    
  }

  async announcementConversations(){
    const announcementConversation = await this.webSocket.getAnnouncementMessages().subscribe(
      res => {
        this.announcementArray = res;
      },
      err => {
        console.log(err);
        
      }
    );
  }
}
