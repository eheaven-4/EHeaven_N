import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';


interface newsview {
  _id:String;
  userid:String;
  topic:String;
  newsSumery:String;
  news:String;
  date:String;
  state:String;
}

interface userType {
  userType:String;

}


@Component({
  selector: 'app-newsview',
  templateUrl: './newsview.component.html',
  styleUrls: ['./newsview.component.scss']
})
export class NewsviewComponent implements OnInit {

  newses: newsview[] = [];
  usertype: userType[] = [];

  news_id:string;
  file_path:String;
  userType:String;


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: MycookiesService,
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() {
    const myCookie = JSON.parse(this.cookies.getCookie('userAuth'));    // get cookie data from cookies
    this.usertype = myCookie.usertype;   // load user type to the userType array

    if (myCookie) {
      const url = 'http://localhost:3000/newsview/view';
      this.http.get<any>(url).subscribe(res => {
        this.newses = res;
      }, (err) => {
        console.log(err);
      });
    } else {
      alert('Please Login First..!');
      this.router.navigate(['/login']);
    }
  }

}
