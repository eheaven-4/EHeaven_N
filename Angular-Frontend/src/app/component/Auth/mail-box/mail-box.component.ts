import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { Router } from '@angular/router';
import { MatSnackBarConfig, MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


interface mail {  //decalare interface class for load notification attributes.
  _id: String;
  name: String;
  email: String;
  mobile: String;
  nic: String;
  date: String;
  state: String;
  subject: String;
  message: String;
}

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.scss']
})

export class MailBoxComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router: Router,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) { }

  mails: mail[] = [];
  public delete;
  usertype
  notice_id: String;
  cookie;

  ngOnInit() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));    // get cookie data from cookies
    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.usertype = myCookie.usertype;   // load user type to the userType array

    if (myCookie) {
      var url = 'http://localhost:3000/contact_us/allMessages';
      this.http.get<any>(url).subscribe(res => {
        this.mails = res;
        console.log(res);

      }, (err) => {
        console.log(err);
      });
    }
    else {
      alert("Please Login First..!");
      this.router.navigate(['/login']);
    }
  }

  deleteMail(delEvent, notice_id) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to Disapprove?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        var url = 'http://localhost:3000/contact_us/deleteMessage';
        this.http.delete<any>(url + '/' + notice_id).subscribe(res => {
          console.log(res);
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Successfully deleted..! ", true ? "Done" : undefined, config);
        }, (err) => {
          console.log(err);
        });
        location.reload();
      }
    })
  }

  readMail(event, notice_id) {

  }
}
