import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // userid : id [] = [];
  user: any;
  authtoken: any;

  constructor(
    private router: Router,
    private flashmessage: NgFlashMessageService,
    private cookieService : CookieService,
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
    
    this.cookieService.deleteAll();
  }

  fetchUserData(){
    const user = localStorage.getItem("user");
    this.user = user;
    return JSON.parse(user).userid; 
  }

  userProfile(){
    var id = this.fetchUserData();
        
    this.router.navigate(['/profile'+'/'+id]);
  }

}
