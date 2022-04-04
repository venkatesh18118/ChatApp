import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { io } from 'socket.io-client';
import { ChatroomService } from './chatroom.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  //itemArray: any = [];
  //public socket: any;
  constructor(private chatroomService: ChatroomService,private http: HttpClient, private router: Router) { 
  }
  
  public socket =  io('http://localhost:3000', {
    query:{
      id:localStorage.getItem('user_id'),
    }
  });

  // async communication(){
  //   this.socket = await io('http://localhost:3000', {
  //     query:{
  //       id:this.chatroomService.loginId,
  //     }
  //   });
  // }

  async joinRoom(){
    this.socket.emit('joinRoom',{
      userid:localStorage.getItem('user_id'),
      chatRoomId:this.chatroomService.roomId
    });
    
  }

  leaveRoom(){
    this.socket.emit('leaveRoom',{
      chatRoomId:this.chatroomService.roomId
    })
    this.router.navigate(['/dashboard']);
  }

  chatRoomMessage(message){
    this.socket.emit('chatroomMessage',{
      user:localStorage.getItem('user_id'),
      name:this.chatroomService.name,
      chatroom:this.chatroomService.roomId,
      message:message
    });  
    
  }

  announcementMessage(message){
    this.socket.emit('announcementMessage',{
      user:localStorage.getItem('user_id'),
      name:this.chatroomService.name,
      message:message
    })
  }
  getAllMessagesfromRoom(){
   return this.http.get(`http://localhost:3000/chatroomMessages/${this.chatroomService.roomId}`);
  }

  getAnnouncementMessages(){
    return this.http.get('http://localhost:3000/announcementMessages');
  }
  
  // this.socket.once('chatroomMessage',(data:any) => {

  //     this.itemArray.push(data);
  //     console.log(this.itemArray);
  //   })

  receiveMessages(){
    const observable = new Observable<{ chatroom: any, user: any, message: String, name: String }>
    (observer => {
      this.socket.on('chatroomMessage', (data) => {
        observer.next(data);
        console.log(data + 'on success');
      });
      return () => {
        this.socket.disconnect();
      };
    });
  return observable;
  }
  
  receiveAnnouncementMessages(){
    const observable = new Observable<{ user: any, message: String, name: String }>
    (observer => {
      this.socket.on('announcementMessage', (data) => {
        observer.next(data);
        console.log(data + 'on success');
      });
      return () => {
        this.socket.disconnect();
      };
    });
  return observable;
  }
  
  

  

  // chatRoomMessage(message){
  //   this.socket.emit('chatroomMessage',{
  //     chatroomId:this.chatroomService.roomId,
  //     message:`${message}`
  //   });
  //   this.socket.once('newMessage', async (data:any)=>{
  //     this.itemArray.push(data);
  //     console.log(this.itemArray);
  //   }
  //   )
  // }
  

 
}
