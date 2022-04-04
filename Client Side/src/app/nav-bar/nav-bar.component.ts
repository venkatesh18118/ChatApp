import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(public authService: AuthService , private router: Router) { }
  adminLogin: boolean = false;
  ngOnInit(): void {
    
  }
  logoutUser(){
    this.authService.logOutuser();
  }
  redirectToAdmin(){
    this.adminLogin = true;
    this.router.navigate(['/admin/login']);
  }
  redirectToUser(){
    this.adminLogin = false;
    this.router.navigate(['/login']);
  }
}
