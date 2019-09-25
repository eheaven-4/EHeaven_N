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
  userid: String;

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
  // examinations years
  yearofExam = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];

  ngOnInit() {
  }

  submitToApproval() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));  //get userdate cookies from cookies
    this.userid = myCookie.userid;     //tke userid from cookies
    // console.log(this.CertificationForm.value , myCookie.usertype)
    if (this.userid) {
      //create certificateApproval JSON object
      const certificateApproval = {
        userid: myCookie.userid,
        certName: this.CertificationForm.value.certName,
        certType: this.CertificationForm.value.certType,
        examName: this.CertificationForm.value.exam.examName,
        examYear: this.CertificationForm.value.exam.examYear,
        examIndex: this.CertificationForm.value.exam.examIndex,
        state: "Pending"
      }

      var url = "http://localhost:3000/certification/requestCert"  //server url

      this.http.post<any>(url, certificateApproval).subscribe(res => {   //requesting ro the server and send data to  save
        if (res.state) {
          console.log(res.msg);
          alert("Successfully Requested..!");
          this.CertificationForm.reset();
          this.router.navigate(['/certification']);
        }
        else {
          console.log(res.msg);
          alert("Certificate Requesting Unsuccessfull..!");
          this.router.navigate(['/certification']);
        }
      });
      console.log(certificateApproval)
    }
    else {
      alert("Please Login First..!")
      this.router.navigate(['/login']);
    }
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
