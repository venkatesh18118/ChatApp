import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatroomService } from '../chatroom.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chatRoomForm: FormGroup;
  roomArray:any = [];
  displayError: boolean = false;
  constructor(private formBuilder:FormBuilder, private router: Router, private http: HttpClient, private chatroomService: ChatroomService, private snackbar: MatSnackBar) {
    this.chatRoomForm = this.formBuilder.group({
      name:''
    })
   }
  
  async ngOnInit() {
    await this.getChatRoom();
    await this.chatroomService.getUserid();
  }

  async getChatRoom(){
    await this.http.get('https://fyp-chat-app.herokuapp.com/chatRoom').subscribe(
      res => {
        this.roomArray = res;
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 || err.status === 500){
            this.router.navigate(['/login']);
          }
        }
      })
  }

  // addChatroom(){
  //   this.http.post('http://localhost:3000/chatRoom',this.chatRoomForm.value).subscribe(
  //     res => {
  //       this.getChatRoom();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

  individualRoom(item){
    // this.chatroomService.roomId = item._id;
    if(item.year == this.chatroomService.year && item.section == this.chatroomService.section){
      this.router.navigate(['/chatroom',item._id]);
    }
    else{
      this.snackbar.open('This room is not available for you!', null, {duration: 3000});
    }
  }
}
