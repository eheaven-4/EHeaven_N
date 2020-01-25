import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Mark} from './mark';
import { Marksheet} from './mark';



interface classTeacher {
  _id: String,
  ctName: String
}

interface students {
  _id: String,
  userid: String,
  name: String
}

interface yearArrray {
  year: String
}

interface subjectsArray {
  subId: String,
  subName: String,
}


@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.scss']
})
export class ManageMarksComponent implements OnInit {

  className: String;
  ctName: classTeacher[] = [];
  csNames: students[] = [];
  ClassSearchForm: FormGroup;
  dataform: Boolean = false;  //sata division default didn't show
  submitted = false;
  myYear: yearArrray[] = [];
  mySubject: subjectsArray[] = [];
  FinalMark=new Marksheet();
  students:Array<Mark>=[];  

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private http: HttpClient,
  ) { }

  myTerm = [1,2,3];

  StudentMarksForm = this.fb.group({
    subject: ['', Validators.required],
    year: ['', Validators.required],
    term: ['', Validators.required],
    studentId: ['', Validators.required],
    studentName: ['', Validators.required],
    subjectMark: ['', Validators.required],  
  });

  ngOnInit() {

    this.ClassSearchForm = this.fb.group({
      className: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]]
    });

    var year = new Date().getFullYear();
    var years = [];

    /*load the last 5 years in to the mat select*/
    for (var i = 0; i < 5; i++) {
      years.push(year - i);
      this.myYear[i] = years[i]
    }

    /*get all th subject names*/
    const url = "http://localhost:3000/class_management/getSubjects"
    this.http.get<any>(url).subscribe(res => {
      this.mySubject = res.data;

    });


  }

  get f() {
    return this.ClassSearchForm.controls;
  }
  get f2() {
    return this.StudentMarksForm.controls;
  }
  setMark(i,mark){
    
    
    
    this.students[i].mark=mark;


  }
  onReset() {
    this.submitted = false;
    this.ClassSearchForm.reset();
    this.StudentMarksForm.reset();
  }

  searchStudents(event,className) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ClassSearchForm.invalid) {
      return;
    }
    else {

      const cName = className;
      this.FinalMark.classname=cName;
      

      var url1 = "http://localhost:3000/class_management/getClassTeacherName"
      var url2 = "http://localhost:3000/users/getStudentsNames/"

      this.http.get<any>(url1 + '/' + cName).subscribe(res => {
        if (res.state == false) {
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Error find in data..! ", true ? "Retry" : undefined, config);
        }
        else {
          

          this.ctName = res.data
          this.http.get<any>(url2 + cName).subscribe(res => {
            this.csNames = res.data
           for(var i=0;i<this.csNames.length;i++){
              var temp=new Mark();
              temp.name=this.csNames[i].name.toString();
              temp.userid=this.csNames[i].userid.toString();
              console.log(temp);
              this.students.push(temp);
              this.dataform = true;
            }
            console.log(res.data);
          })
          console.log(res)
        }
      });

    }
  }

  submitMarks() {
    const formData = new FormData();

    console.log(this.StudentMarksForm.value.subject)
    this.FinalMark.subject=this.StudentMarksForm.value.subject;
    this.FinalMark.term=this.StudentMarksForm.value.term;
    this.FinalMark.year=this.StudentMarksForm.value.year;
    this.FinalMark.marks=this.students;
    console.log(this.FinalMark);
    this.http.post<any>('http://localhost:3000/student_marks/addLog',this.FinalMark)
    .subscribe(
      data => {
        console.log('Success', data)
        window.location.reload();
      },
      error =>{ 
        console.error('Error!', error)
        
      
      }
    );
    

    // formData.append('year', this.StudentMarksForm.value.year)
    // formData.append('semester', this.StudentMarksForm.value.semester)
    // console.log(formData.get('subject'));

    // for (var i = 0; i < this.csNames.length; i++) {
    //   formData.append('marks', this.csNames[i].name.value.);
    // }

  }
}
