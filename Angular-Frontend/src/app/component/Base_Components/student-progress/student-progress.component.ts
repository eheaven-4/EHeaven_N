import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
    private http: HttpClient
  ) { }

  myYear: yearArrray[] = [];
  mySubject: subjectsArray[] = [];


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['1st Term', '2nd Term', '3rd Term'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60], label: 'Maths Marks' }
  ];
  chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(0, 140, 255,0.5)',
      borderColor: 'rgba(2, 113, 204,0.5)',
      pointBackgroundColor: 'rgba(0, 65, 100,0.5)',
      pointBorderColor: 'rgba(2, 50, 50)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    // { // second color
    //   backgroundColor: 'rgba(225,10,24,0.2)',
    //   borderColor: 'rgba(225,10,24,0.2)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    // }
  ];

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
