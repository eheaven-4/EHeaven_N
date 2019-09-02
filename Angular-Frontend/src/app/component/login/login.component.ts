import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
// import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface LoginResponse{
  state: boolean,
  token: string,
  user: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userid:String;
  password:String;

  user: any;
  authtoken: any;
  
  constructor(
    private flashMessage: NgFlashMessageService,
    private router: Router,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }
  
  userLogin(){
    const user = {
      userid:this.userid,
      password:this.password
    };

    var url = "http://localhost:3000/users/login";

    this.http.post<any>(url,user).subscribe(res => {
        console.log(JSON.stringify(res));
        console.log(res.state);
        if(res.state){
          this.storeData(res.token, res.user);
          this.flashMessage.showFlashMessage({
            messages: ["Login Successfully"],
            dismissible: true, 
            timeout: 2000,
            type: 'success'
          });
          this.router.navigate(['/profile']);
        }
        else{
          console.log(res.msg);
          alert("Username or password incorrect .. !");
          this.router.navigate(['/login']);
        }
      }
    )
  }

  storeData(token, userData){
    localStorage.setItem("tokenId", token);
    localStorage.setItem("user", JSON.stringify(userData));

    this.authtoken = token;
    this.user = userData;
  }
}
