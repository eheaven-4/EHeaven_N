import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../mycookies.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {


  attachment;
  date;
  state;
  filename;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService, //import Mycookies Service files
    private ngFlashMessage: NgFlashMessageService,
    private fb: FormBuilder,
  ) { }

  NotificationForm = this.fb.group({
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  ngOnInit() { }

  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.attachment = file;
      this.filename = file.name;
    }
  }

  addNotice() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    var userid = myCookie.userid;

    this.date = Date();
    this.state = "Pending"
    const formData = new FormData();

    formData.append('notificationAttachment', this.attachment)
    formData.append('userid', userid.value)
    formData.append('date', this.date)
    formData.append('subject', this.NotificationForm.value.subject)
    formData.append('message', this.NotificationForm.value.message)
    formData.append('state', this.state)

    console.log(formData)

    var url = "http://localhost:3000/notification/add";

    //send request to  the server
    this.http.post<any>(url, formData).subscribe(res => {
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
}
