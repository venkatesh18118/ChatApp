import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorbot',
  templateUrl: './mentorbot.component.html',
  styleUrls: ['./mentorbot.component.css']
})
export class MentorbotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToPage(){
    this.router.navigate(['/dashboard']);
  }
}
