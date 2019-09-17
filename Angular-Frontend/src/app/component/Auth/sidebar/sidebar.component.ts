import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user : any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  fetchUserData(){
    const user = localStorage.getItem("user");
    this.user = user;
    return JSON.parse(user).userid; 
  }

  userAcademics(){
    var id = this.fetchUserData();
    this.router.navigate(['/academics'+'/'+id]);
  }
}
