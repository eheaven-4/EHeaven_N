import { Component, OnInit,Input } from '@angular/core';
import {AttendenceService} from '../attendence.service';
import {Returnuser} from '../attend';
import {Attend} from '../attend';
import {AttendList} from '../attend';
import {Attendreturn} from '../attend';
import {FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import { MycookiesService} from '../../../Admin/mycookies.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {

@Input('parentData') public classname;

public usercookie=JSON.parse(this.cookie.getCookie("userAuth"));
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
stu = new FormControl('', [Validators.required]);

  


  constructor(private attendanceservice:AttendenceService,
    private inputs:FormBuilder,
    private router : Router,
    private cookie:MycookiesService
    ) { }
  public attendacelist=this.inputs.group({
    
  })
  ngOnInit() {
    this.attendanceservice.retriveUsers(this.classname)
    .subscribe((data:Returnuser[])=>{
      this.students=data;
      this.numberOfStudent=data.length;
      this.toggle=new Array(this.numberOfStudent);
      for (var j=0;j<this.numberOfStudent;j++){
        this.toggle[j]="Absent";
        

      }
    });
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
  onSubmit(userForm){
    var attendList=[];
    this.mainflag=false;
    const student = Object.entries(userForm.value);
    for (const [i,attend] of student) {
      var newRec=new Attend();
      newRec.username=this.students[i].name;
      newRec.userid=this.students[i].userid;
      // newRec.class=this.classname;
      // newRec.marked=this.usercookie.userid;
      
      if(attend==""){

        newRec.attend=false;

      }else if(attend==true){
        
        newRec.attend=true;
      }else if(attend==false){
        
        newRec.attend=false;
      }
      console.log(newRec);
      attendList.push(newRec);
      
    }
    var FinalList=new AttendList();
    FinalList.class=this.classname;
    FinalList.markedby=this.usercookie.userid;
    FinalList.atendList=attendList;
    console.log(FinalList);
    this.attendanceservice.logAdd(FinalList)
       .subscribe(
          data=>console.log('Success',data),
          error=>console.error('Error!',error)
       )
    
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
