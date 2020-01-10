import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface subjectsArray{
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
    private http : HttpClient
  ) { }

  myYear: yearArrray[] = [];
  mySubject: subjectsArray[] = [];



  ngOnInit() {
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

}
