import { Component, OnInit } from '@angular/core';
import {ClassRoom} from '../../Admin/class-registration/Classroom';
import {AttendenceService} from './attendence.service';
import { Attendreturn } from './attend';


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
  public searchStuResult:[];
  public searchDateResult:[];
  public historyflagD=true;
  public historyflagS=true;
  public data=new Attendreturn();
  public spanflageD=false;
  public spanflageS=false;
  public months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

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
  searchStu(month:string,stu:string){
    this.historyflagS=false;
    var temp=parseInt(month)
    temp+=1;
    console.log(stu,temp);
    this.attendanceservice.retriveStu(temp,stu)
    .subscribe((data)=>{
      if(data.length==0){
        this.historyflagS=true;
        this.spanflageS=true;
      }else{
        this.searchStuResult=data;
        console.log(this.searchStuResult);
      }
    });
  }
  searchDate(value:string,classnm:string){
    var params=value+";"+classnm;
    this.historyflagD=false;
    this.attendanceservice.retriveDate(params)
    .subscribe((data)=>{
      if(data.length==0){
        this.historyflagD=true;
        this.spanflageD=true;
      }else{
        console.log(this.searchDateResult);
        this.searchDateResult=data;
      }
    });
    
  }

}
