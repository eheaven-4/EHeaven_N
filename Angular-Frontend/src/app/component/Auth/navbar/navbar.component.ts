import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;
  authtoken: any;

  constructor(
    private router: Router,
    private flashmessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    
  }
  logoutUser(){
     this.logout();
     this.flashmessage.showFlashMessage({
      messages: ["Logout Successfully"],
      dismissible: true, 
      timeout: 2000,
      type: 'success'
     });
     this.router.navigate(['/login']);
  }
  logout(){
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
 }

}
