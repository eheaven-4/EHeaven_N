import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  usertype: String;
  userid: String;
  subject: String;
  message: String;
  date: String;
  state: String;

  user: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService, //import Mycookies Service files
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() { }
  
  addNotice() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));  
    this.userid = myCookie.userid;
    this.usertype = myCookie.usertype;

    if(this.userid){  //fetch user data cookies 
      const notice = {
        usertype: this.usertype,
        userid: this.userid,
        subject: this.subject,
        message: this.message,
        date: this.date,
        state: "Pending"
      }
  
      var url = "http://localhost:3000/notification/add";
  
      //send request to  the server
      this.http.post<any>(url, notice).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          this.ngFlashMessage.showFlashMessage({
            messages: ["Successfully Added ..!"], 
            dismissible: true, 
            timeout: 2000,
            type: 'success',
          });
          this.router.navigate(['/notifications']);
        }
        else {
          console.log(res.msg);
          this.ngFlashMessage.showFlashMessage({
            messages: ["Notification Adding Unsuccessfull..!"], 
            dismissible: true, 
            timeout: 2000,
            type: 'danger',
          });
          this.router.navigate(['/add_notification']);
        }
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
