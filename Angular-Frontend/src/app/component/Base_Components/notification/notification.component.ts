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
  public approve_show: boolean = false;
  public disapprove_show: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: MycookiesService,
  ) { }

  ngOnInit() {
    // console.log(this.cookies.getCookie("userAuth"));
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    // console.log(myCookie);
    var userType = myCookie.usertype;
    console.log(userType)
    if(myCookie){
      var url = "http://localhost:3000/notification/view";
  
      this.http.get<any>(url).subscribe(res => {
        this.notices = res;
        console.log(res)
        // var i = 0;
        // for (var prop in res) {
        //   if (res.hasOwnProperty(prop)) {
        //     // console.log(res[i].state)          
        //     if (res[i].state == 'Approved') {
        //       console.log(res[i].state)
        //       this.disapprove_show = true
        //     }
        //     else {
        //       this.approve_show = true

        //     }
        //     i++;
        //   }
        //   else {
        //     break
        //   }
        // }
  
      }, (err) => {
        console.log(err);
      });
    }
    else{
      alert("Please Login First..!");
      this.router.navigate(['/login']);
    }
  }

  disapprove(event, notice_id) {  //disapprove button action
    var mybtnId = notice_id;
    console.log(mybtnId);
    var url = "http://localhost:3000/notification/delete";

    this.http.delete(url + '/' + mybtnId).subscribe(res => {  //send delete the notification request to the server
      console.log(res);
      alert("Successfully Deleted..!");
      window.location.reload();     //reload the page
    }, (err) => {
      console.log(err);
    });
  }

  approve(event, notice_id) {     //approve button action
    var mybtnId = notice_id;
    console.log(mybtnId);

    var url = "http://localhost:3000/notification/approve";

    this.http.get(url + '/' + mybtnId).subscribe(res => {  //send add a notification request to the server
      console.log(res);
      alert("Successfully Approved..!");
      window.location.reload();   //realod window
    }, (err) => {
      console.log(err);
    });
  }
}


