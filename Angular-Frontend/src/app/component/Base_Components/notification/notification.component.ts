import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

interface notification {  //decalare interface class for load notification attributes. 
  _id: String;
  userid: String;
  subject: String;
  message: String;
  date: String;
  state: String;
}

interface userType {  //load interface for get user type
  userType: String;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notices: notification[] = [];
  usertype: userType[] = [];

  notice_id: String;
  file_path: String;
  userType: String;

  public approve_show: boolean = false;
  public disapprove_show: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookies: MycookiesService,
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() {

    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));    // get cookie data from cookies
    this.usertype = myCookie.usertype;   //load user type to the userType array

    if (myCookie) {
      var url = "http://localhost:3000/notification/view";
      this.http.get<any>(url).subscribe(res => {
        this.notices = res;
      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("Please Login First..!");
      this.router.navigate(['/login']);
    }
  }

  disapprove(event, notice_id, file_path) {  //disapprove button action
    var mybtnId = notice_id;
    var mybtnFile = file_path;  

    var url = "http://localhost:3000/notification/delete";    //notification content delete url
    var urlDelete = "http://localhost:3000/notification/notAttachment"; //notification attachment delete url

    //if there is a file in attachment call atachment file delteing request
    if(mybtnFile){
      this.http.delete(urlDelete + '/' + mybtnFile).subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err)
      });
    }
    //call content delete request
    this.http.delete(url + '/' + mybtnId).subscribe(res => {  //send delete the notification request to the server
      this.ngFlashMessage.showFlashMessage({
        messages: ["Successfully Added ..!"],
        dismissible: true,
        timeout: 2000,
        type: 'success',
      });
    }, (err) => {
      console.log(err);
    });

    window.location.reload();     //reload the page
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


