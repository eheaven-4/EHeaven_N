import { Component, OnInit } from '@angular/core';
import {AttendenceService} from './attendence.service';
import {Returnuser} from './attend';
import {Attend} from './attend';
import {Attendreturn} from './attend';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})


export class AttendanceComponent implements OnInit {
public classname="1-A";

public students:Array<Returnuser>;
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
public today=new Date();
public spanflageD=false;
public spanflageS=false;
public c_url=null;
public toggle;
public months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  constructor(private attendanceservice:AttendenceService,private inputs:FormBuilder,private router : Router) { }
  public attendacelist=this.inputs.group({
    
  })
  ngOnInit() {
    this.attendanceservice.retriveUsers()
    .subscribe((data:Returnuser[])=>{
      this.students=data;
      this.numberOfStudent=data.length;
      this.toggle=new Array(this.numberOfStudent);
      for (var j=0;j<this.numberOfStudent;j++){
        this.toggle[j]="Absent";
        

      }
    });
    
    
    
  }
 
  addData(stu:Attend){
    this.attendanceservice.logAdd(stu)
       .subscribe(
          data=>console.log('Success',data),
          error=>console.error('Error!',error) 
    );
  }
  count(index){
    if(this.toggle[index]=="Present"){
      this.presentStu--;
      this.toggle[index]="Absent";
      
    }else{
      this.presentStu++;
      this.toggle[index]="Present";
    }
  }
  
  // storeValue(index) {
     
  //     console.log(this.numberOfStudent);
  //     this.toggle[index]="Present";
  //     if(index==this.i){
  //       var newRec=new Attend();
  //       newRec.username=this.students[index].name;
  //       newRec.userid=this.students[index].userid;
  //       newRec.attend=true;
  //       newRec.class=this.classname;
  //       this.presentStu++;
      
  //       console.log(newRec);
        
  //       this.addData(newRec);
        
  //       this.i++;
  //     }
  //     else if(this.i<index){
  //         for(var j = this.i; j <index; j++) {
  //           var newRec=new Attend();
  //           newRec.username=this.students[j].userid;
  //           newRec.attend=false;
  //           newRec.class=this.classname;
  //           console.log(newRec);
  //           this.addData(newRec);
              
  //         }
        
  //         newRec=new Attend();
  //         newRec.username=this.students[index].userid;
  //         newRec.attend=true;
  //         newRec.class=this.classname;
  //         console.log(newRec);
  //         this.addData(newRec);
  //         //newRec.date=this.today;
  //         this.i=index+1;
  //         this.presentStu++;

  //         // console.log(newRec);
  //     }else{
  //       newRec=new Attend();
  //       newRec.username=this.students[index].userid;
  //       newRec.attend=true;
  //       newRec.class=this.classname;
  //       console.log(newRec);

  //     }      
  // }

  onSubmit(userForm){
    // console.log(userForm);
    this.mainflag=false;
    const student = Object.entries(userForm.value);
    for (const [i,attend] of student) {
      var newRec=new Attend();
      newRec.username=this.students[i].name;
      newRec.userid=this.students[i].userid;
      newRec.class=this.classname;

      if(attend==""){

        newRec.attend=false;

      }else if(attend==true){
        
        newRec.attend=true;
      }else if(attend==false){
        
        newRec.attend=false;
      }
      console.log(newRec);
      this.addData(newRec);
      
    }
    
    // 
    // if(this.i<=this.numberOfStudent){
    //   for(var j=this.i;j<this.numberOfStudent;j++){
    //     var newRec=new Attend();
    //     newRec.username=this.students[j].userid;
    //     newRec.attend=false;
    //     newRec.class=this.classname;
    //     console.log(newRec);
    //     this.addData(newRec);

    //   }
    // }
  }
  searchStu(month:string,stu:string){
    this.historyflagS=false;
    var temp=parseInt(month)
    temp+=1;
    console.log(stu,temp);
    this.attendanceservice.retriveStu(temp,stu)
    .subscribe((data:Attendreturn[])=>{
      if(data.length==0){
        this.historyflagS=true;
        this.spanflageS=true;
      }else{
        this.searchStuResult=data;
        console.log(this.searchStuResult);
      }
      
    });
  }
  searchDate(value:string){
    console.log(value);
    this.historyflagD=false;
    this.attendanceservice.retriveDate(value)
    .subscribe((data:Attendreturn[])=>{
      if(data.length==0){
        this.historyflagD=true;
        this.spanflageD=true;
      }else{
        this.searchDateResult=data;
      }
    });
    
  }

}
