import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { tokenNotExpired } from 'angular2-jwt';

interface Task{
  name:String,
  username: String,
  email: String,
  password:String
}

interface LoginResponse{
  state: boolean,
  token: string,
  user: any
}

class UserData{
  token: String;
  name:String;
  username: String;
  email: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  authtoken: any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{tasks: Task[]}>
          ("http://localhost:3000/users/register",
          user,
          {headers:headers})
          .pipe(map(res => res.tasks));
  }

  loginUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{loginRes: LoginResponse}>
          ("http://localhost:3000/users/login",
          user,
          {headers:headers});
  }

  storeData(token, userData){
    localStorage.setItem("tokenId", token);
    localStorage.setItem("user", JSON.stringify(userData));

    this.authtoken = token;
    this.user = userData;
  }

  getProfile(){
    this.fetchToken();
    this.fetchUserData();
   
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.get<UserData[]>
          ("http://localhost:3000/users/profile",{headers:headers})
          .pipe(map(res => {
            this.fetchUserData()
            return res;
          }));
  }

  fetchToken(){
    const token = localStorage.getItem("tokenId");
    this.authtoken = token;
    return this.authtoken;
  }

  fetchUserData(){
    const user = localStorage.getItem("user");
    this.user = user;
    return this.user;
  }

  logout(){
     this.authtoken = null;
     this.user = null;
     localStorage.clear();
  }

  // loggedIn() {
  //   return tokenNotExpired();
  // }
}
