import { Component, OnInit } from '@angular/core';
import {AttendenceService} from './attendence.service';
import {User} from './../../../user';
import {Attend} from './attend';
import {Attendreturn} from './attend';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
public classname="1-A";

public students:Array<User>;
public attendRecord:Attend[];

public searchStuResult:Attendreturn[];
public searchDateResult:Attendreturn[];
public i=0;
public numberOfStudent=0;
public presentStu=0;
public mainflag=true;
public historyflagD=true;
public historyflagS=true;
public data=new Attendreturn();

  constructor(private attendanceservice:AttendenceService) { }

  ngOnInit() {
    this.attendanceservice.retriveUsers()
    .subscribe((data:User[])=>{
      this.students=data;
      this.numberOfStudent=data.length;
    });
    
    
  }
  addData(stu:Attend){
    this.attendanceservice.logAdd(stu)
       .subscribe(
          data=>console.log('Success',data),
          error=>console.error('Error!',error) 
    );
  }
  
  storeValue(index) {
     
      console.log(this.numberOfStudent);
      if(index==this.i){
        var newRec=new Attend();
        newRec.username=this.students[index].userid;
        newRec.attend=true;
        newRec.class=this.classname;
        this.presentStu++;
      
        console.log(newRec);
        //this.addData(newRec);
        this.addData(newRec);
        //this.attendRecord.push(newRec);
        this.i++;
      }
      else if(this.i<index){
          for(var j = this.i; j <index; j++) {
            var newRec=new Attend();
            newRec.username=this.students[j].userid;
            newRec.attend=false;
            newRec.class=this.classname;
            console.log(newRec);
            this.addData(newRec);
              
          }
        
          newRec=new Attend();
          newRec.username=this.students[index].userid;
          newRec.attend=true;
          newRec.class=this.classname;
          console.log(newRec);
          this.addData(newRec);
          //newRec.date=this.today;
          this.i=index+1;
          this.presentStu++;

          // console.log(newRec);
      }else{
        newRec=new Attend();
        newRec.username=this.students[index].userid;
        newRec.attend=true;
        newRec.class=this.classname;
        console.log(newRec);
        this.updateData(newRec);

      }      
  }
  updateData(stu:Attend){
    this.attendanceservice.logUpdate(stu)
        .subscribe(
            data=>console.log('Success',data),
            error=>console.error('Error!',error) 
    );
  }
  onSubmit(){
    this.mainflag=false;
    if(this.i<=this.numberOfStudent){
      for(var j=this.i;j<=this.numberOfStudent;j++){
        var newRec=new Attend();
        newRec.username=this.students[j].userid;
        newRec.attend=false;
        newRec.class=this.classname;
        console.log(newRec);
        this.addData(newRec);

      }
    }
  }
  searchStu(value:string){
    this.historyflagS=false;
    console.log(value);
    this.attendanceservice.retriveStu(value)
    .subscribe((data:Attendreturn[])=>{
      this.searchStuResult=data;
    });
  

  }
  searchDate(value:string){
    console.log(value);
    this.historyflagD=false;
    this.attendanceservice.retriveDate(value)
    .subscribe((data:Attendreturn[])=>{
      this.searchDateResult=data;

    });
  }

}
