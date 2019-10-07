import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface classTeacher{ //create a class to sore data to the array for clss teachers name
  _id : String,
  ctName : String
}

interface studentData{  //create a class to store data to the array for the student data fom the users
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
  ctName : classTeacher [] = [];    //store class teacher name of user given input class Name
  stData : studentData [] = [];   //store classroom student in the specific class

  subject : String;
  year : String;
  semester : String;
  userid : String;
  username : String;
  marks : String;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  StudentMarksForm = this.fb.group({
    stuSubject: ['', Validators.required],
    // certType: ['', Validators.required],
    // exam: this.fb.group({
    //   examName: ['', Validators.required],
    //   examYear: ['', Validators.required],
    //   examIndex: ['', Validators.required]
    // })
  });
  // Subjects types
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
  years = [2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029];   //Academic years
  semesters = ['First Semester', 'Second Semester', 'Third Semester']   //Examinations semesters

  ngOnInit() {
    //Load the all the class room names in to the page from the begining
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

    //get class teachers name from the database
    this.http.get<any>(url1 + '/' + cName).subscribe(res => {
      this.ctName = res
      console.log(res)
    });

    //load students name and the student id of this class
    this.http.get<any>(url2 + '/' + cName).subscribe(res => {
      this.stData = res
      console.log(res)
    })
  }

  submitMarks(){
    console.log("naisudnikfs")
    //send students marks to the backend
    const object = {
      subject : this.subject,
      year: this.year,
      semester : this.semester,
      marksBulk : [{
        userid : this.userid,
        name : this.username,
        marks : this.marks
      }]
    };

    console.log(object);
  }
}
