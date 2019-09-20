import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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
  certificates = ['Studentship Confirmation Certificate','Character Certificate','Leaving Certificate','Educational Certificate'];

  // examinations
  exams = ['Grade 05 Scholarship Examination','Ordinary Level ( G.C.E. O/L ) Examination','Advanced Level ( G.C.E. A/L ) Examination'];
  yearofExam = ['2010','2011','2012','2013','2014','2015','2016','2017','2018'];




  ngOnInit() {
  }

  // test
  hello(){
    console.log('hello world');
  }
}
