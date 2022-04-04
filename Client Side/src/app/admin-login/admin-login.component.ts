import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatroomService } from '../chatroom.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {
    this.adminLoginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }
  ngOnInit(): void {
  }

  adminLogin(){
    if(this.adminLoginForm.value.email=="admin@gmail.com" && this.adminLoginForm.value.password=="admin123"){
      this.snackbar.open('Login Successfully!!', null, {duration: 3000});
      this.router.navigate(['/admin/dashboard']);
    }
    else{
      this.snackbar.open('Invalid Credentials!', null, {duration: 3000});
      console.log("Invalid User");
    }
  }
}
