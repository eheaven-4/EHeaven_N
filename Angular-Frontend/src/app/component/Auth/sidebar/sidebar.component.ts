import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
// import { CookieService } from 'ngx-cookie-service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { UserDetail } from '../../Userdetail';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userid: String;
  user: any;
  myCookie: string;
  userDetail: UserDetail = { usertype: "", id: "", name: "", email: "", selectclass: "", userid: "" };
  constructor(
    private router: Router,
    private cookies: MycookiesService,
    // private cookieService: CookieService,
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myCookie = this.cookies.getCookie("userAuth")
    if (this.myCookie == "") {
      this.router.navigate(['/login']); //if cookie null, then redirected to the login page
    } else {
      this.userDetail = JSON.parse(this.myCookie);  //get the user details from the cookies
    }
  }

  userAcademics() {

    if (this.myCookie) {
      this.router.navigate(['../', this.userDetail.userid, 'academic_subject']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

  userNotification() {

    if (this.myCookie) {
      this.router.navigate(['../', this.userDetail.userid, 'notifications']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
  userCertification() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'certification']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
  userPrepCertification() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'prepare_certification']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

  userAttendence() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'attendance']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

  userExtraCur() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'extra_curricular']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

  userStudentMarks() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'manage_marks']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

  userStudentProg() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'student_progress']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
  adminDashboard() {
    if (this.myCookie) {

      this.router.navigate(['../', this.userDetail.userid, 'admin_dashboard']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
}
