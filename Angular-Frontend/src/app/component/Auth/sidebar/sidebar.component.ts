import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
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
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() {
    
  }

  userAcademics() {

    if (this.myCookie) {

      //Takes user id from the cookies data
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

  //side bar notification conponent opening link
  //all the users refer this link. 
  userNotification() {
    if (this.myCookie) {
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

  //sidebar user certification request component opening link
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

  //sidebar user attendence request component opening link
  
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

  //sidebar user extra curricular activities component opening link
  //only students can vew this link
  userExtraCur() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/extra_curricular']);
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

  //sidebar student marks management component opening link
  //only teachers can viwe this tab

  userStudentMarks() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/manage_marks']);
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

  //sidebar user certification request component opening link
  //all the users can view this tab
  userStudentProg() {
    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/student_progress' + '/' + id]);
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

  //clicking this button opens the admin dash board, only admin
  //can access this link
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
