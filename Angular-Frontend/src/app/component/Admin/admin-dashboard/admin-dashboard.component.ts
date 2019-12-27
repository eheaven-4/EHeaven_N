import { Component, OnInit } from '@angular/core';
import { MycookiesService } from '../mycookies.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  myCookie;
  constructor(
    private cookies: MycookiesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    console.log(this.myCookie.userid);
    if(this.myCookie.usertype!="Administrator"){
      this.router.navigate(["/404"]);
    }
  }

}
