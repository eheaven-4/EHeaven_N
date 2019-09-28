import { Component, OnInit } from '@angular/core';
import {AttendenceService} from './attendence.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  public classname="1-A"
  public students=[{"name":"Pradeepa1","flag":false},
  {"name":"Pradeepa2","flag":true},
  {"name":"Pradeepa3","flag":true},
  {"name":"Pradeep4","flag":true},
  {"name":"Pradeep5","flag":true},
  {"name":"Pradeepa6","flag":true},
  {"name":"Pradeepa7","flag":false},
  {"name":"Pradeepa8","flag":true},
  {"name":"Pradeepa9","flag":true},
  {"name":"Pradeepa10","flag":true},
  {"name":"Pradeepa11","flag":true},
  {"name":"Pradeepa12","flag":true},
  {"name":"Pradeepa13","flag":true},
  {"name":"Pradeepa14","flag":true},
  {"name":"Pradeepa15","flag":true},
  {"name":"Pradeepa16","flag":true},
  {"name":"Pradeepa17","flag":true},
  {"name":"Pradeepa18","flag":true}
];
public dataarr=[];
public data={};
public  i=0;

  constructor(private attendanceservice:AttendenceService) { }

  ngOnInit() {
  }
  addData(stu:object){
    this.attendanceservice.enrolladd(stu)
       .subscribe(
          data=>console.log('Success',data),
          error=>console.error('Error!',error) 
    )
  }

  
  storeValue(name:string,val:boolean,index) {
      var value="";
      if(index==this.i){
        var stu={
          "name":name,
          "attend":val

        };
        console.log(stu);
        this.addData(stu);

        this.dataarr[name]=val;
        this.i++;
      }else{
        for (var key in this.dataarr) {
          if(key==name){
            this.dataarr[key]=val;
          }
        }   

      }
      if(val){
        value="Present";
      }else{
        value="Absence";
      }
      console.log(name+" is "+value);
         
  }
  onSubmit(){
    for (var key in this.dataarr) {
      var valu = this.dataarr[key];
      console.log(key, valu);
    }
    // this.attendanceservice.enroll(this.dataarr)
    //    .subscribe(
    //       data=>console.log('Success',data),
    //       error=>console.error('Error!',error) 
    // )
  }

}
