import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  value: String = '';
  flag = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient


    ) { }

  CertificationForm = this.fb.group({
    certName: ['', Validators.required],
    certType: ['', Validators.required],
    exam: this.fb.group({
       examName: ['', Validators.required],
       examYear: ['', Validators.required],
       examIndex: ['', Validators.required]
    })
  });

  // CertificationForm = new FormGroup({
  //   certName: new FormControl(''),
  //   certType: new FormControl(''),
  //   exam:     new FormGroup({
  //     examName: new FormControl(''),
  //     examYear: new FormControl(''),
  //     examIndex: new FormControl('')
  //   })
  // });
          // add function to get logged username by default

  // certificate types
  certificates = ['Student Status Verification Certificate','Character Certificate','Leaving Certificate','Educational Certificate'];

  // examinations
  exams = ['Grade 05 Scholarship Examination','Ordinary Level ( G.C.E. O/L ) Examination','Advanced Level ( G.C.E. A/L ) Examination'];
  yearofExam = ['2010','2011','2012','2013','2014','2015','2016','2017','2018'];




  ngOnInit() {
  }

  // on submit

  applyCertificates(){
    console.log(this.CertificationForm.value);
    alert('Applied Sucessfully');
    this.CertificationForm.reset();
    //  this.router.navigate(['certification']);
  }

  // used to show/hide form fields

  testfunction(value) {
    if(value == "Educational Certificate"){
       this.flag = true;

    }
    else{
       this.flag = false;

    }

  }
}
