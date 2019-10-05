import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-add-class-timetable',
  templateUrl: './add-class-timetable.component.html',
  styleUrls: ['./add-class-timetable.component.scss']
})
export class AddClassTimetableComponent implements OnInit {

  className :String;

  M1: String; M2: String; M3: String; M4: String; M5: String; M6: String; M7: String; M8: String;
  T1: String; T2: String; T3: String; T4: String; T5: String; T6: String; T7: String; T8: String;
  W1: String; W2: String; W3: String; W4: String; W5: String; W6: String; W7: String; W8: String;
  TH1: String; TH: String; TH3: String; TH4: String; TH5: String; TH6: String; TH7: String; TH8: String;
  F1: String; F2: String; F3: String; F4: String; F5: String; F6: String; F7: String; F8: String;


  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService, //import Mycookies Service files
    private ngFlashMessage: NgFlashMessageService,
  ) { }

  ngOnInit() {
  }

  addTimeTable(){

    const timeTable = {
      className : this.className,
      monday: [{
        one : this.M1,
        two : this. M2
      }]
    }

    var url = "http://localhost:3000/class_management/timeTableRegistration";

    console.log(timeTable)
    this.http.post<any>(url,timeTable).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        this.ngFlashMessage.showFlashMessage({
          messages: ["Successfully Added ..!"], 
          dismissible: true, 
          timeout: 2000,
          type: 'success',
        });
        this.router.navigate(['/add_cls_tt']);
      }
      else {
        console.log(res.msg);
        this.ngFlashMessage.showFlashMessage({
          messages: ["Notification Adding Unsuccessfull..!"], 
          dismissible: true, 
          timeout: 2000,
          type: 'danger',
        });
        this.router.navigate(['/add_cls_tt']);
      }
    })
  }
}