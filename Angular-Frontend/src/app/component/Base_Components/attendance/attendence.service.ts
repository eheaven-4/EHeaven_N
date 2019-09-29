import { Injectable } from '@angular/core'; 
import{HttpClient} from '@angular/common/http';

import {User} from './../../../user';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  _url1='http://localhost:3000/attendance/addLog';
  get_url='http://localhost:3000/attendance/received';
  
  constructor(private _http:HttpClient) { }
  logAdd(stu:object){
    return this._http.post<any>(this._url1,stu);
  }
  retriveUsers(){
    return this._http.get(this.get_url);
  }



}
