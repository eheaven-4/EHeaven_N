import { Injectable } from '@angular/core'; 
import{HttpClient} from '@angular/common/http';

import {User} from './../../../user';
import {Attend} from './attend';
import {Attendreturn} from './attend'

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
  retriveUsers(){
    return this._http.get(this.get_url);
  }
  logUpdate(stu:Attend){
    return this._http.post<Attend>(this.update_url,stu);
  }
  retriveDate(value:string){
  
  console.log(value);
   var  get_date='http://localhost:3000/attendance/searchDate';
   return this._http.get<any>(get_date,{params: {date:value}});

  }
  retriveStu(userid:string){
    console.log(userid+"hello");
    var  get_Students='http://localhost:3000/attendance/searchStu/'+userid;
    return this._http.get<any>(get_Students);

  }


}
