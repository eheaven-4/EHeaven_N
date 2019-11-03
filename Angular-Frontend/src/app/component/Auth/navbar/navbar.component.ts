import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { CookieService } from 'ngx-cookie-service';
import { MycookiesService } from '../../Admin/mycookies.service';

interface userType {  //load interface for get user type
  userType: String;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  user: any;
  authtoken: any;
  userid: String;
  usertype: userType[] = [];

  public approve_show: boolean = false;
  public disapprove_show: boolean = false;

  constructor(
    private router: Router,
    private ngFlashMessage: NgFlashMessageService,
    private cookieService: CookieService,
    private cookies: MycookiesService
  ) { }

  ngOnInit() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));    // get cookie data from cookies
    this.usertype = myCookie.usertype;

  }

  logoutUser() {
    // this.logout();
    this.authtoken = null;
    this.user = null;
    localStorage.clear();

    this.cookieService.delete('userAuth');
    this.ngFlashMessage.showFlashMessage({
      messages: ["Logout Successfully..!"],
      dismissible: true,
      timeout: 2000,
      type: 'warning'
    });
    this.router.navigate(['/login']);

    // window.location.reload();     //reload the page
  }
  
  // logout() {
  //   this.authtoken = null;
  //   this.user = null;
  //   localStorage.clear();

  //   this.cookieService.delete('userAuth');
  // }

  userProfile() {
    var myCookie = this.cookies.getCookie("userAuth");
    // console.log(myCookie);
    if (myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // console.log(id);
      this.router.navigate(['/profile' + '/' + id]);
    }
    else {
      this.ngFlashMessage.showFlashMessage({
        messages: ["Please Login First..!"], 
        dismissible: true, 
        timeout: 2000,
        type: 'warning',
      });
      this.router.navigate(['/login']);
    }
  }
  menu(){
    var myCookie = this.cookies.getCookie("userAuth");
    // console.log(myCookie);
    if (myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // console.log(id);
      this.router.navigate(['/academic_subject' + '/' + id]);
    }
    else {
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
