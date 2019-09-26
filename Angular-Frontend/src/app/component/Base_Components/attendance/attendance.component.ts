import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }
  storeValue(name:string,val:boolean) {
      var value="";
      if(val){
        value="Present";
      }else{
        value="Absence";
      }
      console.log(name+" is "+value);   
  }

}
