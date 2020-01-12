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
  submitted = false;

  myYear: yearArrray[] = [];
  mySubject: subjectsArray[] = [];
  myTerm = ['1st Term', '2nd Term', '3rd Term',]

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

  StudentProgressForm = this.fb.group({
    year: ['', Validators.required],
    subject: ['', Validators.required],
    term: ['', Validators.required],
    className: [''],
  });

  ngOnInit() {

    this.cookie = JSON.parse(this.cookies.getCookie("userAuth"));
    this.usertype = this.cookie.usertype;   // load user type to the userType array

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
    return this.StudentProgressForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.StudentProgressForm.reset();
  }

  myProgress() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.StudentProgressForm.invalid) {
      return;
    }
    else {
      const formData = new FormData();

      formData.append('subject', this.StudentProgressForm.value.year)
      formData.append('year', this.StudentProgressForm.value.subject)
      formData.append('semester', this.StudentProgressForm.value.term)

      var url = "http://localhost:3000/student_progress/userAsStudent"

      this.http.post<any>(url, formData).subscribe(res => {
        console.log(res.msg);
      });
    }
  }
  studentProgress() {
    const formData = new FormData();

    formData.append('subject', this.StudentProgressForm.value.year)
    formData.append('year', this.StudentProgressForm.value.subject)
    formData.append('semester', this.StudentProgressForm.value.term)
    formData.append('semester', this.StudentProgressForm.value.className)

    var url = "http://localhost:3000/student_progress/userAsTeacher"

    this.http.post<any>(url, formData).subscribe(res => {
      console.log(res.msg);
    });
  }

}
