import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Router } from '@angular/router';

interface notification{
  _id:String;
  userid:String;
  subject:String;
  message: String;
  date:String;
  state:String;
}


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notices : notification [] = [];

  noticeId:any;

  notice_id:String;

  constructor(
    private http: HttpClient,
    private router: Router, 
    ) { }

  ngOnInit() {
    var url = "http://localhost:3000/notification/view";        

      this.http.get<any>(url).subscribe(res => {
          console.log(res);
          this.notices = res;
          }, (err) => {
            console.log(err);
          });   
  }

  disapprove(){
    var noticeId = $('.noticeClass').html();
    console.log(noticeId);
    
    var url = "http://localhost:3000/notification/delete";

    this.http.delete(url+'/'+noticeId).subscribe(res => {
      alert("Successfully Deleted..!");
      this.router.navigate(['/notifications']);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}


