import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.scss']
})
export class StudentProgressComponent implements OnInit {

  constructor() { }

  certificates = [
    'Student Status Verification Certificate',
    'Character Certificate',
    'Leaving Certificate',
    'Educational Certificate'
  ];
  
  ngOnInit() {
  }

}
