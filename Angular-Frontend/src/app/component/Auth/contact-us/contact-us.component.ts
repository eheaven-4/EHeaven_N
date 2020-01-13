import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) { }

  submitted = false;

  // ContactusForm = this.fb.group({
  //   name: ['', [Validators.required, Validators.maxLength(100)]],
  //   email: ['', Validators.required],
  //   mobile: ['', [Validators.required, Validators.maxLength(10)]],
  //   nic: ['', [Validators.required, Validators.maxLength(13)]],
  //   subject: ['', [Validators.required, Validators.maxLength(100)]],
  //   message: ['', [Validators.required, Validators.maxLength(800)]]
  // })
  ContactusForm = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    mobile:new FormControl(''),
    nic:new FormControl(''),
    subject:new FormControl(''),
    message:new FormControl(''),
  })

  ngOnInit() {
  }


  get f() {
    return this.ContactusForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.ContactusForm.reset();
  }

  sendMessage(form) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ContactusForm.invalid) {
      return;
    }
    else {
      // const formData = new FormData();

      // formData.append('name', this.ContactusForm.value.name)
      // formData.append('email', this.ContactusForm.value.email)
      // formData.append('mobile', this.ContactusForm.value.mobile)
      // formData.append('nic', this.ContactusForm.value.nic)
      // formData.append('subject', this.ContactusForm.value.subject)
      // formData.append('message', this.ContactusForm.value.message)

      var url = "http://localhost:3000/contact_us/sendMessage";

      // send request to  the server
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to send message?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
      console.log("in");
      this.http.post<any>(url, form).subscribe(res => {
        console.log("out");

        if (res.state) {
          console.log(res.msg);
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Message Successfully Sent..! ", true ? "Done" : undefined, config);

          this.router.navigate(['../contact_us']);
        }
        else {
          console.log(res.msg);
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Message is not send..! ", true ? "Done" : undefined, config);
          this.router.navigate(['../contact_us']);
        }
      });
      }
      })
    }
  }
}
