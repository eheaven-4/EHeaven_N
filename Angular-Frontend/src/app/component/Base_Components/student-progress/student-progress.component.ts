import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.scss']
})
export class StudentProgressComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {
    var year = new Date().getFullYear();
    var range = [];

    
    // range.push(year);

    for (var i = 0; i < 7; i++) {
      range.push(year - i);
      console.log(range[i]);      
    }
    // $scope.years = range;
    
  }

}
