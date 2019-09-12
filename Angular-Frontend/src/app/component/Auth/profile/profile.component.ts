import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  ) { }

  ngOnInit() {       
    this.fetchUserData();
      var url = "http://localhost:3000/users/profile";        

      var id = this.fetchUserData();
      console.log(id);
      this.http.get<any>(url+'/'+id).subscribe(res => {
          console.log(res);
          this.profiledata = res;
          // JSON.stringify(res);
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
    // console.log(JSON.parse(user).userid);
    return JSON.parse(user).userid; 
  }


}
