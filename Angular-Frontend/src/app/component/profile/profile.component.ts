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

  authtoken: any;
  user : any;

  constructor(
    private http: HttpClient,  
  ) { }

  ngOnInit() {       
    
    // console.log(this.fetchUserData());
      var url = "http://localhost:3000/users/profile";  


      
      // this.http.get<any>(url,{headers:headers}).subscribe(res => {
      //   console.log(res);
      //   this.user = res.user;
      // });
      // .map(res => {
      //   res.json()
      // });

      var id = this.fetchUserData();
      console.log( this.fetchUserData());
      this.http.get(url+id).subscribe(res => {
          console.log(res);              
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
    return user;  
  }


}
