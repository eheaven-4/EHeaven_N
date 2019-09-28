import { Injectable } from '@angular/core'; 
import{HttpClient} from '@angular/common/http';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  _url='http://localhost:3000/attendance';
  constructor(private _http:HttpClient) { }
  enrolladd(stu:object){
    return this._http.post<any>(this._url,stu);
  }



}
