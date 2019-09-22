import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { Router, NavigationEnd } from '@angular/router';

interface notification {  //decalare interface class for load notification attributes. 
  _id: String;
  userid: String;
  subject: String;
  message: String;
  date: String;
  state: String;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notices: notification[] = [];
  noticeId: any;
  notice_id: String;
  show: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: MycookiesService,
  ) { }

  ngOnInit() {
    // console.log(this.cookies.getCookie("userAuth"));

    var url = "http://localhost:3000/notification/view";

    this.http.get<any>(url).subscribe(res => {
      this.notices = res;
      console.log(res[1].state)

      // for(var i =0; i<10; i++){
      //   console.log(res[i].state)
      // }
    }, (err) => {
      console.log(err);
    });
  }

  disapprove(event, notice_id) {  //disapprove button action
    var mybtnId = notice_id;
    console.log(mybtnId);
    var url = "http://localhost:3000/notification/delete";

    this.http.delete(url + '/' + mybtnId).subscribe(res => {  //send delete the notification request to the server
      console.log(res);
      alert("Successfully Deleted..!");
      window.location.reload();     //reload the page
      // this.router.navigate(['/notifications']);
    }, (err) => {
      console.log(err);
    });
  }

  approve(event, notice_id) {     //approve button action
    var mybtnId = notice_id;
    console.log(mybtnId);

    var url = "http://localhost:3000/notification/approve";

    this.http.get(url + '/' + mybtnId).subscribe(res => {  ////send add a notification request to the server
      console.log(res);
      alert("Successfully Approved..!");
      window.location.reload();   //realod window
    }, (err) => {
      console.log(err);
    });
  }
}


