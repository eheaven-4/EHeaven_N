import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { CookieService } from 'ngx-cookie-service';
import { MycookiesService } from '../../Admin/mycookies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  user: any;
  authtoken: any;
  userid: String;

  constructor(
    private router: Router,
    private ngFlashMessage: NgFlashMessageService,
    private cookieService: CookieService,
    private cookies: MycookiesService
  ) { }

  ngOnInit() {
  }

  //log out the website 
  logoutUser() {
    this.logout();
    this.ngFlashMessage.showFlashMessage({
      messages: ["Logout Successfully..!"],
      dismissible: true,
      timeout: 2000,
      type: 'warning'
    });
    this.router.navigate(['/login']);
    // window.location.reload();     //reload the page
  }
  
  //delete the saved cookes from the cookies when th user logout
  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
    this.cookieService.delete('userAuth');
  }

  userProfile() {   //get user data from the cookied and view this in the profile page
    var myCookie = this.cookies.getCookie("userAuth");
    // console.log(myCookie);
    if (myCookie) {   //if the cookie available routes to the user profile page
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/profile' + '/' + id]);
    }
    else {    //else redirect to the login again to store data to cookies
      this.ngFlashMessage.showFlashMessage({
        messages: ["Please Login First..!"], 
        dismissible: true, 
        timeout: 2000,
        type: 'warning',
      });
      this.router.navigate(['/login']);
    }
  }

}
