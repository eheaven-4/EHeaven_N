import { Component, OnInit } from '@angular/core';
import {AttendenceService} from './attendence.service';
import {User} from './../../../user';
import {Attend} from './attend';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
public classname="1-A";

public students:Array<User>;
public attendRecord:Attend[];
public i=0;



  constructor(private attendanceservice:AttendenceService) { }

  ngOnInit() {
    this.attendanceservice.retriveUsers()
    .subscribe((data:User[])=>{
      this.students=data;
    })
  }
  addData(stu:object){
    this.attendanceservice.logAdd(stu)
       .subscribe(
          data=>console.log('Success',data),
          error=>console.error('Error!',error) 
    )
  }
  // genarateDate(){
  //   var date=Date();
  //   var dat=1;
  

  // }
  
  storeValue(userid:string,val:boolean,index) {
      var value="";
      if(index==this.i){
        var newRec=new Attend();
        newRec.userid=userid;
        newRec.attend=val;
        newRec.class=this.classname;
      
        console.log(newRec);
        //this.addData(newRec);
        if(this.i==0){
          this.attendRecord[0]=newRec;
        }
        //this.attendRecord.push(newRec);
        this.i++;
      }else{
        for(var i = 0; i < this.attendRecord.length; i++) {
            if(this.attendRecord[i].userid==userid){
                this.attendRecord[i].attend=val;
              
            }
        }
        // var newRec=new Attend();
        // newRec.userid=userid;
        // newRec.attend=val;
        // newRec.class=this.classname;
        // newRec.date=this.today;

        // console.log(newRec);
      }   

      // }
      // if(val){
      //   value="Present";
      // }else{
      //   value="Absence";
      // }
      // console.log(name+" is "+value);
         
  }
  // onSubmit(){
  //   for (var key in this.dataarr) {
  //     var valu = this.dataarr[key];
  //     console.log(key, valu);
  //   }
    // this.attendanceservice.enroll(this.dataarr)
    //    .subscribe(
    //       data=>console.log('Success',data),
    //       error=>console.error('Error!',error) 
    // )
 // }

}
