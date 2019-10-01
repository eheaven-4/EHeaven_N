import { Injectable } from '@angular/core'; 
import{HttpClient} from '@angular/common/http';

import {User} from './../../../user';
import {Attend} from './attend'

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


}
