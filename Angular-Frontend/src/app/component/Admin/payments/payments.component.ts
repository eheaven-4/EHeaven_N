import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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




  paymentForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      sName : ['', [Validators.required]],
      sId : ['' , [Validators.required]],
      sClass : ['' , [Validators.required]],
      pName : ['', [Validators.required]],
      payment : ['' , [Validators.required]]
    });
  }

  get f() {
    return this.paymentForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.paymentForm.reset();
  }

  addPayment() {
  this.submitted = true;


  if (this.paymentForm.invalid) {
    return;
  } else {



  const formData = new FormData();

  formData.append('sName', this.paymentForm.value.sName);
  formData.append('sId' , this.paymentForm.value.sId );
  formData.append('sClass', this.paymentForm.value.sClass);
  formData.append('pName', this.paymentForm.value.pName);
  formData.append('payment' , this.paymentForm.value.payment);

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
      this.http.post<any>(url , formData).subscribe(res => {
        console.log(res.msg);

        if  (res.state) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Payment Successfukky Added..!' , true ? 'Done' : undefined , config);

        window.location.reload();

    } else {
      const config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open('Payment is not Added..!' , true ? 'Retry' : undefined , config);
      //this.router.navigate('/payments');
    }

      });

    }

  });

}
}
}
