import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  submitted = false;
  dataform: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) { }

  // PaymentForm = this.fb.group({
  //   sName: ['', Validators.required],
  //   sId: ['', Validators.required],
  //   sClass: ['', Validators.required],
  //   pName: ['', Validators.required],
  //   payment: ['', Validators.required]
  // });
  PaymentForm=new FormGroup({
    sName:new FormControl(''),
    sId:new FormControl(''),
    sClass:new FormControl(''),
    pName:new FormControl(''),
    payment:new FormControl(''),
  });

  ngOnInit() {}

  get f() {
    return this.PaymentForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.PaymentForm.reset();
  }

  addPayment(form) {
    this.submitted = true;
    
    if (this.PaymentForm.invalid) {
      
      return;
    }
    else {
      console.log("Valid");

      const url = 'http://localhost:3000/payment/add';

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure want to Add?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.http.post<any>(url, form).subscribe(res => {
            if (res.state) {
              console.log(res.msg);
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Payment Data Successfully Added..! ", true ? "Done" : undefined, config);
            }
            else {
              console.log(res.msg);
              let config = new MatSnackBarConfig();
              config.duration = true ? 2000 : 0;
              this.snackBar.open("Payment Data does not Added..! ", true ? "Done" : undefined, config);
            }
          });
        }
      });
    }
  }
}
