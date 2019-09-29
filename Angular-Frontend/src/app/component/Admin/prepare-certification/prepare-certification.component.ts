import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-prepare-certification',
  templateUrl: './prepare-certification.component.html',
  styleUrls: ['./prepare-certification.component.scss']
})
export class PrepareCertificationComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  StudentStatusForm = this.fb.group({
    studentName: ['', Validators.required],
    admissionNum: ['', Validators.required],
    dateofAdmission: ['', Validators.required],
    currentStatus: ['', Validators.required],
    description: ['', Validators.required],

  });

  ngOnInit() {

  }

  submitStudentstatus() {


    const studentStatusApproval = {
      studentName: this.StudentStatusForm.value.studentName,
      admissionNum: this.StudentStatusForm.value.admissionNum,
      dateofAdmission: this.StudentStatusForm.value.dateofAdmission,
      currentStatus: this.StudentStatusForm.value.currentStatus,
      description: this.StudentStatusForm.value.description,
    };

    var url = 'http://localhost:3000/certification/studentstatus'



    this.http.post<any>(url, studentStatusApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.StudentStatusForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
    console.log(studentStatusApproval);

    window.location.reload();    

  }

}
