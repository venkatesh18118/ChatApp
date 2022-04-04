import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Login} from './Models/Login'

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  loginId;
  name;
  roomId;
  roomName: any;
  year;
  section;
  constructor(private authService: AuthService, private http: HttpClient) { }
  async getUserid(){
    let token = await this.authService.getToken();
    const success : any  = await this.http.get(`https://fyp-chat-app.herokuapp.com/userDetails/${token}`).toPromise();
    
    this.name = success.name;
    this.loginId = success._id;
    this.year = success.year;
    this.section = success.section;
    localStorage.setItem('user_id',this.loginId);
  }
  async getChatroomName(){
    await this.http.get(`https://fyp-chat-app.herokuapp.com/chatRoom/${this.roomId}`).subscribe(
      res => {
        const ChatroomDetails = Object.entries(res);
        this.roomName = ChatroomDetails[0][1].name;
      },
      err => {
        console.log('err');
      }
    );
  }
}
