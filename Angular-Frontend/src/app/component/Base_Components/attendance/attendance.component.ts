import { Component, OnInit } from '@angular/core';
import {ClassRoom} from '../../Admin/class-registration/Classroom';
import {AttendenceService} from './attendence.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  classlist:Array<ClassRoom>;

  flag=true;
  class:string;
  
  constructor(private attendanceservice:AttendenceService){}

  ngOnInit(){
    this.attendanceservice.getclass()
    .subscribe((data:ClassRoom[])=>{
      this.classlist=data;
      console.log(this.classlist);
    });
  }
  goTo(name){
    console.log(name);
    this.flag=false;
    this.class=name; 
  }
}
