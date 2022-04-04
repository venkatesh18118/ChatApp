import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  chatRoomForm: FormGroup;
  roomArray: Object;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.chatRoomForm = this.formBuilder.group({
      name:['',Validators.required],
      year:['',Validators.required],
      section:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.getChatRoom()
  }

  async addChatroom(){
    if(this.chatRoomForm.valid){
      await this.http.post('https://fyp-chat-app.herokuapp.com/chatRoom',this.chatRoomForm.value).subscribe(
        async res => {
          await this.getChatRoom();
        },
        err => {
          console.log(err);
        }
      );
    }
    
      this.chatRoomForm.value.name = ""
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
  individualRoom(item){
    this.http.delete(`https://fyp-chat-app.herokuapp.com/${item._id}`).subscribe(
      res => {
        this.getChatRoom();
      },
      err => {
        console.log(err);
      }
    )
  }
}
