import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userid: String;
  user : any;
  constructor(
    private router: Router,
    private cookies: MycookiesService,
  ) { }

  ngOnInit() {
  }

  // fetchUserData(){
  //   const user = localStorage.getItem("user");
  //   this.user = user;
  //   return JSON.parse(user).userid;
  // }

  userAcademics(){
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    console.log(myCookie.userid);
    this.userid = myCookie.userid;
    // var id = this.fetchUserData();
    this.router.navigate(['/academics'+'/'+this.userid]);
  }
}
