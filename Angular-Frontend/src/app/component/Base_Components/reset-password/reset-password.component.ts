import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }
  ResetPasswordForm: FormGroup;
  submitted = false;
  userid

  ngOnInit() {
    this.ResetPasswordForm = this.fb.group({
      oldpw: ['', [Validators.required, Validators.minLength(8)]],
      newpw: ['', [Validators.required, Validators.minLength(8)]],
      renewpw: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  resetPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ResetPasswordForm.invalid) {
      return;
    } else {

      const formData = new FormData();

      formData.append('usertype', this.ResetPasswordForm.value.usertype)
      formData.append('userid', this.ResetPasswordForm.value.userid)
      formData.append('selectclass', this.ResetPasswordForm.value.selectclass)

      /****************************************************** */
      console.log(this.ResetPasswordForm.value.usertype);
      const url = 'http://localhost:3000/users/updateUser/';




      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to update?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {

          this.http.post<any>(url + this.userid + "/" + this.propicName, formData).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Successfully Updated..! ", true ? "Done" : undefined, config);
              // this.router.navigate(['/login']);
            }
            else {
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Error in Update User..! ", true ? "Retry" : undefined, config);
              // this.router.navigate(['/register']);
            }
          });
          window.location.reload();
        }
      })
    }
  }
}
