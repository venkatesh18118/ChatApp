import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { AuthService } from '../auth.service';
import { ChatroomService } from '../chatroom.service';
import { Login } from '../Models/Login';
import { WebSocketService } from '../web-socket.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private chatroomService: ChatroomService, private websocketService: WebSocketService, private authService: AuthService, private snackbar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
    if(this.authService.loggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  async loginDetails(){
    if(this.loginForm.valid){
      const val = this.http.post('http://localhost:3000/login',this.loginForm.value).subscribe(
        async res => {
          const response = Object.entries(res);
          const token = response[0][1];
          localStorage.setItem('token',token);
          const snackbarRef = this.snackbar.open('Login Successfully!!', null, {duration: 3000});
          //this.chatroomService.loginId = res;
          await this.chatroomService.getUserid();
          //await this.websocketService.communication();
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.snackbar.open('Invalid Credentials!', null, {duration: 3000});
          console.log(err);
        }
      )
    }
    
  }
  redirectToRegisterPage(){
    this.router.navigate(['/register']);
  }

  // async communication(){
  //   const socket = await io('http://localhost:3000', {
  //     query:{
  //       id:this.chatroomService.loginId
  //     }
  //   });
  // }
}
