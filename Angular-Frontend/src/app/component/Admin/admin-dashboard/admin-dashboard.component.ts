import { Component, OnInit } from '@angular/core';
import { MycookiesService } from '../mycookies.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface notification {  //decalare interface class for load notification attributes.
  _id: String;
  userid: String;
  subject: String;
  message: String;
  date: String;
  state: String;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  myCookie;
  mailCount;
  preparecertCount;
  notices: notification[] = [];

  constructor(
    private cookies: MycookiesService,
    private router:Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    const url1 = 'http://localhost:3000/admin/mailCount'
    var temp=this.cookies.getCookie("userAuth");
    if(temp!=""){
      this.myCookie = JSON.parse(temp);

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

    }else{
      this.router.navigate(['/login'])
    }

    const url2 = 'http://localhost:3000/notification/view';
    this.http.get<any>(url2).subscribe(res => {
      this.notices = res;
      console.log(res)
    }, (err) => {
      console.log(err);
    });
    

  }

}
