import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

interface profile{
  usertype:String;
  userid:String;
  name: String;
  email:String;
  password:String;
  birthday:String;
  mobilenumber:String;
  homenumber:String;
  gender:String;
  nationality:String;
  nicnumber:String;
  father:String;
  mother:String;
  address:String;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profiledata : profile [] = [];

  authtoken: any;
  user : any;

  constructor(
    private http: HttpClient,  
    private cookies: MycookiesService
  ) { }

  ngOnInit() {     
    console.log(this.cookies.getCookie("Sachin"));
    this.fetchUserData();
      var id = this.fetchUserData();
      var url = "http://localhost:3000/users/profile";        

      console.log(id);
      this.http.get<any>(url+'/'+id).subscribe(res => {
          console.log(res);
          this.profiledata = res;
          }, (err) => {
            console.log(err);
          });   
  }
  
  fetchToken(){
    const token = localStorage.getItem("tokenId");
    this.authtoken = token;
  }

  fetchUserData(){
    const user = localStorage.getItem("user");
    this.user = user;
    return JSON.parse(user).userid; 
  }
}
