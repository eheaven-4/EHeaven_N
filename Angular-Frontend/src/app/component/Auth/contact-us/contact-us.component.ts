import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private fb : FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient
  ) { }

  submitted = false;
    date;
    state;

  ContactusForm = this.fb.group({
    name: ['',[ Validators.required, Validators.maxLength(100)]],
    email: ['', Validators.required],
    mobile: ['',[ Validators.required, Validators.maxLength(10)]],
    nic: ['',[ Validators.required, Validators.maxLength(13)]],
    subject: ['',[ Validators.required, Validators.maxLength(100)]],
    message: ['', [Validators.required, Validators.maxLength(800)]]
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
  
  sendMessage(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.ContactusForm.invalid) {
      return;
    }
    else {
      this.date = Date();
      this.state = "Pending"
      const formData = new FormData();
      
      formData.append('name', this.ContactusForm.value.subject)
      formData.append('email', this.ContactusForm.value.message)
      formData.append('mobile', this.ContactusForm.value.message)
      formData.append('message', this.ContactusForm.value.message)
      formData.append('subject', this.ContactusForm.value.message)
      formData.append('message', this.ContactusForm.value.message)
      formData.append('state', this.state)
          
      var url = "http://localhost:3000/notification/add";
      
      //send request to  the server
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
          this.http.post<any>(url, formData).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("News Successfully Added..! ", true ? "Done" : undefined, config);
              
              this.router.navigate(['../contact_us']);
            }
            else {
              console.log(res.msg);
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Notification is not Added..! ", true ? "Done" : undefined, config);
              // this.router.navigate(['/add_notification']);
              this.router.navigate(['../contact_us']);
            }
          });
        }
      })
    }
  }

}
