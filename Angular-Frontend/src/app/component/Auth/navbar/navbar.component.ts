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
    private flashmessage: NgFlashMessageService,
    private cookieService: CookieService,
    private cookies: MycookiesService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.logout();
    this.flashmessage.showFlashMessage({
      messages: ["Logout Successfully"],
      dismissible: true,
      timeout: 2000,
      type: 'success'
    });
    this.router.navigate(['/login']);
  }
  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();

    this.cookieService.delete('userAuth');
  }

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
      alert("Please Login First..!");
      this.router.navigate(['/login']);
    }
  }

}
