import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

interface Certificate {
  _id: String,
  userid: String,
  certName: String,
  certType: String,
  examName: String,
  examYear: String,
  examIndex: String,
  reqDate: String,
  state: String
}

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})


export class CertificationComponent implements OnInit {
  value: String = '';
  flag = false;
  userid: String;

  pendingCert : Certificate [] = [];
  issuedCert : Certificate [] = [];

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
    var date  = Date();
    console.log(date)
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));  //get userdate cookies from cookies
    var id = myCookie.userid;
    //load pending and issued certificates tho the user

    var pendingUrl = "http://localhost:3000/certification/pendingCert";
    var issuedUrl = "http://localhost:3000/certification/issuedCert";

    this.http.get<any>(pendingUrl+'/' + id).subscribe(res => {
      console.log(res)
      this.pendingCert = res;

    })

    this.http.get<any>(issuedUrl+ '/'+ id).subscribe(res => {
      console.log(res)
      this.issuedCert = res;
    })
  }

  submitToApproval() {
    var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));  //get userdate cookies from cookies
    this.userid = myCookie.userid;     //get userid from cookies
    var date  = Date(); //get todays date and time

    // console.log(this.CertificationForm.value , myCookie.usertype)
    if (this.userid) {
      if(this.CertificationForm.value.certName == '' || this.CertificationForm.value.certType == ''){
        alert("Fill the form field please..!")
      }
      else{
        //create certificateApproval JSON object
        const certificateApproval = {
          userid: myCookie.userid,
          certName: this.CertificationForm.value.certName,
          certType: this.CertificationForm.value.certType,
          examName: this.CertificationForm.value.exam.examName,
          examYear: this.CertificationForm.value.exam.examYear,
          examIndex: this.CertificationForm.value.exam.examIndex,
          reqDate: date,
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
    }
    else {
      alert("Please Login First..!")
      this.router.navigate(['/login']);
    }
    // window.location.reload();     //reload the page
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
