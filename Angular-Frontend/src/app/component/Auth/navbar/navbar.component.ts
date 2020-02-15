import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {



  public approve_show: boolean = false;
  public disapprove_show: boolean = false;

  constructor(
    private router: Router,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
  ) { }

  usertype
  cookie
  ngOnInit() {
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.usertype = this.cookie.usertype; // load user type to the userType array 
  }
  logoutUser() {

    this.cookies.setCookie("userAuth", "", -1);
    let config = new MatSnackBarConfig();
    config.duration = true ? 2000 : 0;
    this.snackBar.open("Logout Successfully..! ", true ? "Done" : undefined, config);
    this.cookies.logingstatus = false;
    this.router.navigate(['/login']);

  }

  userProfile() {

    var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    var id = userCookie.userid;

    this.router.navigate(['../', id]);

  }
  menu() {
    var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.router.navigate([userCookie.userid, 'menu']);
  }

}
