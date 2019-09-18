import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  userid:String;
  subject:String;
  message: String;
  date:String;
  state:String;

  user:any;

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userid = this.fetchUserData();
    console.log(this.userid);
  }

  addNotice(){
    const notice = {
      userid: this.userid,
      subject: this.subject,
      message: this.message,
      date: this.date,
      state: "false"
    }

    var url = "http://localhost:3000/notification/add";

    this.http.post<any>(url, notice).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        alert("Successfully registerd");
        this.router.navigate(['/notifications']);
      }
      else {
        console.log(res.msg);
        alert("Successfully registerd");
        this.router.navigate(['/add_notification']);
      }
    });
  }
  
  fetchUserData(){
    const user = localStorage.getItem("user");
    this.user = user;
    return JSON.parse(user).userid; 
  }


}
