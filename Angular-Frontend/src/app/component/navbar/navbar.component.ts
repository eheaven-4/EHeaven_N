import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authservice : AuthService,
    private router: Router,
    private flashmessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    
  }
  logoutUser(){
     this.authservice.logout();
     this.flashmessage.showFlashMessage({
      messages: ["Logout Successfully"],
      dismissible: true, 
      timeout: 2000,
      type: 'success'
     });
     this.router.navigate(['/login']);
     return false;
  }

}
