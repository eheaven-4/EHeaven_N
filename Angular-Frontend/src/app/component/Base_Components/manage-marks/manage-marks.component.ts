import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface classTeacher{
  _id : String,
  ctName : String
}

@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.scss']
})
export class ManageMarksComponent implements OnInit {

  className : String;
  ctName : classTeacher [] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }
  // certificate types
  certificates = [
    'Student Status Verification Certificate',
    'Character Certificate',
    'Leaving Certificate',
    'Educational Certificate'
  ];
  CertificationForm = this.fb.group({
    certName: ['', Validators.required],
    certType: ['', Validators.required],
    exam: this.fb.group({
      examName: ['', Validators.required],
      examYear: ['', Validators.required],
      examIndex: ['', Validators.required]
    })
  });

  ngOnInit() {
    var url = "http://localhost:3000/class_management/classRoomsNames";

    this.http.get<any>(url).subscribe(data => {
      console.log(data);
    });
  }

  searchStudents(event, className){
    
    const cName = className;
    console.log(cName)

    var url1 ="http://localhost:3000/class_management/getClassTeacherName"
    // var url2 = ""

    this.http.get<any>(url1 + '/' + cName).subscribe(res => {
      this.ctName = res
      console.log(res)
    });
  }
}
