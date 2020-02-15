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
  status;
  
  constructor(private attendanceservice:AttendenceService){}

  ngOnInit(){
    
    this.attendanceservice.getclass()
    .subscribe((data:ClassRoom[])=>{
      this.classlist=data;
      this.status=new Array(this.classlist.length);
      this.attendanceservice.getStatus().subscribe((data:[])=>{
        console.log(data);
        for(var i=0;i<this.classlist.length;i++){
          this.status[i]=true;
        }
        for(var i=0;i<this.classlist.length;i++){
          for(var j=0;j<data.length;j++){
            if(data[j] == this.classlist[i].classname){
              this.status[i]=false;
            }
          } 
        }
      });
      console.log(this.classlist);
    });
  }
  goTo(name,i){
    if(this.status[i]){
      
      this.flag=false;
      this.class=name; 
    }
  }
  showclass(){
    this.flag=true;
  }

}
