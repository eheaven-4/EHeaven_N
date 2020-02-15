import { Component, OnInit } from '@angular/core';
import { MycookiesService } from '../mycookies.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  myCookie;
  mailCount;
  preparecertCount;

  constructor(
    private cookies: MycookiesService,
    private router:Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    const url1 = 'http://localhost:3000/admin/mailCount'

    this.myCookie = JSON.parse(this.cookies.getCookie("userAuth"));

    // if(this.myCookie.usertype!="Administrator"){
    //   this.router.navigate(["/404"]);
    // }

    this.http.get<any>(url1).subscribe(res => {
      this.mailCount = res.data;
    })

    const url2 = 'http://localhost:3000/admin/preparecertCount'

    this.myCookie = JSON.parse(this.cookies.getCookie("userAuth"));

    this.http.get<any>(url2).subscribe(res => {
      this.preparecertCount = res.data;
    })

  }

}
