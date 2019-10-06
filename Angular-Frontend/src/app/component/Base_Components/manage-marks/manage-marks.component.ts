import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface classTeacher{
  _id : String,
  ctName : String
}

interface studentData{
  _id : String,
  userid : String,
  name : String
}

@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.scss']
})
export class ManageMarksComponent implements OnInit {

  className : String;
  ctName : classTeacher [] = [];
  stData : studentData [] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }
  // certificate types
  subjects = [
    'Mathematics',
    'Science',
    'Buddhism',
    'Sinhala',
    'Tamil',
    'Music',
    'Home Science',
    'English',
    'Health and Sports'
  ];
  years = [2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];
  semesters = ['First Semester', 'Second Semester', 'Third Semester']

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
    var url2 = "http://localhost:3000/users/getStudentsNames"

    this.http.get<any>(url1 + '/' + cName).subscribe(res => {
      this.ctName = res
      console.log(res)
    });
    this.http.get<any>(url2 + '/' + cName).subscribe(res => {
      this.stData = res
      console.log(res)
    })
  }

  submitMarks(){
    
  }
}
