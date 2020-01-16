import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

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
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
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
    this.cookies.logingstatus=false;
    this.cookies.setCookie("userAuth","",-1);
    let config = new MatSnackBarConfig();
    config.duration = true ? 2000 : 0;
    this.snackBar.open("Logout Successfully..! ", true ? "Done" : undefined, config);
    this.cookies.logingstatus=false;
    this.router.navigate(['/login']);

  }


  userProfile() {
    var myCookie = this.cookies.getCookie("userAuth");
    // console.log(myCookie);
    if (myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      var id = userCookie.userid;
      // console.log(id);
      this.router.navigate(['../', id]);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..! ", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }
  menu() {
    var myCookie = this.cookies.getCookie("userAuth");
    if (myCookie) {
      var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      this.router.navigate([userCookie.userid, 'menu']);
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Please Login First..!", true ? "Retry" : undefined, config);
      this.router.navigate(['/login']);
    }
  }

}
