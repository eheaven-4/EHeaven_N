import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

interface subjectsArray {
  subject: String
}
interface yearArrray {
  year: String
}
interface StudentsAverage {
  stuPosition: String
  stuAverage: String
  classname: String
}

class subjectsFilter {
  year: String
  term: String
  subject: String
  mark: String
  subId: String
}


@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.scss']
})
export class StudentProgressComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  usertype
  cookie
  studentAverageDiv : boolean = false;
  submitted = false;
  userid
  term
  year
  subject
  className

  myYear: yearArrray[] = [];
  mySubject: subjectsArray[] = [];
  myTerm = ['1st Term', '2nd Term', '3rd Term',]  //load years to the combo-box
  stuClzAve: StudentsAverage[] = [];
  stuSubMarks: subjectsFilter[] = []; //

  /*bar chart options*/
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['1st Term', '2nd Term', '3rd Term'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [90, 25, 57], label: 'Maths Marks' },

  ];
  chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(0, 140, 255,0.5)',
      borderColor: 'rgba(2, 113, 204,0.5)',
      pointBackgroundColor: 'rgba(0, 65, 100,0.5)',
      pointBorderColor: 'rgba(2, 50, 50)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];
  /************************************************************* */
  DataForm1 = this.fb.group({
    year: ['', Validators.required],
    term: ['', Validators.required],
    className: [''],
  });



  /************************************************************ */

  ngOnInit() {

    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.usertype = this.cookie.usertype; // load user type to the userType array
    this.userid = this.cookie.userid;

    var year = new Date().getFullYear();
    var years = [];

    /*load the last 5 years in to the mat select*/
    for (var i = 0; i < 5; i++) {
      years.push(year - i);
      this.myYear[i] = years[i]
    }

    /*find all students marks data with final marks(for teacher)*/
    const url2 = "http://localhost:3000/student_marks/classAverages"

    //search subjects with marks to list the subject marks in student portal
    const url3 = "http://localhost:3000/student_marks/subjectMarks"
    this.http.get<any>(url3 + "/" + this.userid).subscribe(res => {
      this.stuSubMarks = res
      console.log(this.stuSubMarks);
    })

    /*get all the subject names for the subject serchin combo box*/
    const url4 = "http://localhost:3000/class_management/getSubjects"
    this.http.get<any>(url4).subscribe(res => {
      this.mySubject = res.data;
    });
  }

  get f() {
    return this.DataForm1.controls;
  }

  onReset() {
    this.submitted = false;
    this.DataForm1.reset();
  }

  /*teacher page data*/
  classStudentData() {
    this.studentAverageDiv = true
    
    if (this.DataForm1.value.term == '1st Term') { this.term = 1 }
    else if (this.DataForm1.value.term == '2nd Term') { this.term = 2 }
    else if (this.DataForm1.value.term == '3rd Term') { this.term = 3 }

    // this.year = this.DataForm.value.year
    // this.className = this.DataForm.value.classname

    const Studata = {
      term: this.term,
      classname: this.DataForm1.value.className,
      year: this.DataForm1.value.year,
      userid: this.userid
    };

    const url = 'http://localhost:3000/student_marks/studentAverage'

    this.http.post<any>(url, Studata).subscribe(res => {
      console.log(res)
      this.stuClzAve = res;
    })
  }


}
