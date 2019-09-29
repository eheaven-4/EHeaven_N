import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { CookieService } from 'ngx-cookie-service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userid: String;
  user: any;
  myCookie: String = this.cookies.getCookie("userAuth")
  constructor(
    private router: Router,
    private cookies: MycookiesService,
    private cookieService: CookieService,
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() {
    
  }

  userAcademics() {

    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/academics' + '/' + id]);
    }
    else {
      this.ngFlashMessage.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Login First..!"], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: 2000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'warning',
        
      });
      this.router.navigate(['/login']);
    }
  }

  userNotification() {

    if (this.myCookie) {
      // var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      // var id = userCookie.userid;
      this.router.navigate(['/notifications']);
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
  userCertification() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/certification']);
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
  userPrepCertification() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/prepare_certification']);
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
  userGrades() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/certification']);
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
  userAttendence() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/attendance']);
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

  userExtraCur() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/certification']);
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

  userStudentProg() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/certification']);
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
  adminDashboard() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/admin_dashboard']);
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
