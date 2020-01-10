import { Injectable } from '@angular/core'; 
import{HttpClient} from '@angular/common/http';

import {User} from './../../../user';
import {Attend} from './attend';
import {Attendreturn} from './attend'
import {ClassRoom} from '../../Admin/class-registration/Classroom';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  post_url='http://localhost:3000/attendance/addLog';
  get_url='http://localhost:3000/attendance/received';
  update_url='http://localhost:3000/attendance/update';

  
  constructor(private _http:HttpClient) { }
  logAdd(stu:Attend){
    return this._http.post<Attend>(this.post_url,stu);
  }
  retriveUsers(classname){
    return this._http.get(this.get_url+'/'+classname);
  }
  logUpdate(stu:Attend){
    return this._http.post<Attend>(this.update_url,stu);
  }
  retriveDate(value:string){
  
  console.log(value);
   var  get_date='http://localhost:3000/attendance/searchDate';
   return this._http.get<any>(get_date,{params: {date:value}});

  }
  retriveStu(month:Number,stu:string){
    console.log(stu+month);
    var  get_Students='http://localhost:3000/attendance/searchStu/'+stu+'/'+month;
    return this._http.get<any>(get_Students);

  }
  getclass(){
    var _url="http://localhost:3000/classroom/getdata";
    return this._http.get(_url);
  }


}
