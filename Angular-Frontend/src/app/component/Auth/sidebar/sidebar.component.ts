import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { CookieService } from 'ngx-cookie-service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userid: String;
  user: any;
  myCookie: String = this.cookies.getCookie("userAuth")
  userDetail=JSON.parse(this.cookies.getCookie("userAuth"));;
  constructor(
    private router: Router,
    private cookies: MycookiesService,
    private cookieService: CookieService,
    public snackBar: MatSnackBar,
    public route:ActivatedRoute,
  ) { }

  ngOnInit() { }

  userAcademics() {

    if (this.myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      this.router.navigate(['/academic_subject' + '/' + id]);
      // this.router.navigate(['../',this.userDetail.userid,'notifications']);
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
      // var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      // var id = userCookie.userid;
      this.router.navigate(['../',this.userDetail.userid,'notifications']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/certification'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'certification']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/prepare_certification'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'prepare_certification']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;

      // this.router.navigate(['/attendance'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'attendance']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/extra_curricular'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'extra_curricular']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/manage_marks'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'manage_marks']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/student_progress'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'student_progress']);
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
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // this.router.navigate(['/admin_dashboard'],{relativeTo:this.route});
      this.router.navigate(['../',this.userDetail.userid,'admin_dashboard']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
}
