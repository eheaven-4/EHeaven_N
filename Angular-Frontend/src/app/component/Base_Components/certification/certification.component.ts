import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

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
    private http: HttpClient,
    private cookies: MycookiesService,

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

  // certificate types
  certificates = [
    'Student Status Verification Certificate',
    'Character Certificate',
    'Leaving Certificate',
    'Educational Certificate'
  ];

  // examinations
  exams = [
    'Grade 05 Scholarship Examination',
    'Ordinary Level ( G.C.E. O/L ) Examination',
    'Advanced Level ( G.C.E. A/L ) Examination'
  ];

  yearofExam = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];

  ngOnInit() {
  }

  submitToApproval() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    // console.log(this.CertificationForm.value , myCookie.usertype)

    const certificateApproval = {
      userId : myCookie.userid,
      certName : this.CertificationForm.value.certName,
      certType : this.CertificationForm.value.certType,
      exam : {
        examName : this.CertificationForm.value.exam.examName,
        examYear : this.CertificationForm.value.exam.examYear,
        examIndex : this.CertificationForm.value.exam.examIndex,
      }
    }

    var url = ""

    this.http.post<any>(url, certificateApproval).subscribe( res => {

    });
    
    console.log(certificateApproval)
  }
  // on submit

  applyCertificates() {
    console.log(this.CertificationForm.value);
    alert('Applied Sucessfully');
    this.CertificationForm.reset();
  }

  // used to show/hide form fields

  testfunction(value) {
    if (value == "Educational Certificate") {
      this.flag = true;

    }
    else {
      this.flag = false;

    }

  }

}
