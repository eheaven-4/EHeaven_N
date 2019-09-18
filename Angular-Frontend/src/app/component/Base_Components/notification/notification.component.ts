import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface notification{
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

  constructor(
    private http: HttpClient  
    ) { }

  ngOnInit() {
    var url = "http://localhost:3000/notification/view";        
      // console.log(id);
      this.http.get<any>(url).subscribe(res => {
          console.log(res);
          this.notices = res;
          }, (err) => {
            console.log(err);
          });   
  }

}
