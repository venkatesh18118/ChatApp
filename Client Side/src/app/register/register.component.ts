import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from '../web-socket.service';
import {ChatroomService} from '../chatroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private websocketService: WebSocketService, private chatroomService: ChatroomService, private snackbar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      year:['',Validators.required],
      section:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  async registerDetails(){
    if(this.registerForm.valid){
      this.http.post('https://fyp-chat-app.herokuapp.com/signup',this.registerForm.value).subscribe(
        async res => {
          const response = Object.entries(res);
          const token = response[0][1];
          localStorage.setItem('token',token);
          this.snackbar.open('Registered Successfully!!', null, {duration: 3000});
          await this.chatroomService.getUserid();
          //await this.websocketService.communication();

          this.router.navigate(['/dashboard']);
        },
        err =>{ 
          if(err.error == "Not a valid email"){
            this.snackbar.open('Register only with College Mail(it.ssn.edu.in)', null, {duration: 3000});
          }
          else if(err.error == "User Already Registered"){
            this.snackbar.open('This User is already Registered!', null, {duration: 3000});
          }
          console.log(err)
        })
    }
  }
  redirectToLoginPage(){
    this.router.navigate(['/login']);
  }
}
