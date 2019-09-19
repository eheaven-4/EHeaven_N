import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
// import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userid: String;
  password: String;

  user_id: any;
  user: any;
  authtoken: any;

  constructor(
    private flashMessage: NgFlashMessageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  userLogin() {
    const user = {
      userid: this.userid,
      password: this.password
    };
    // console.log(user.userid);
    var url = "http://localhost:3000/users/login";

    this.http.post<any>(url, user).subscribe(res => {
      console.log(JSON.stringify(res));
      console.log(res.state);
      if (res.state==true) {
        this.storeData(res.token, res.user);

        // this.flashMessage.showFlashMessage({
        //   messages: ["Login Successfully"],
        //   dismissible: true, 
        //   timeout: 2000,
        //   type: 'success'
        // });

        var id = this.fetchUserData();

        this.router.navigate(['/academics' + '/' + id]);
      }
      else {
        console.log(res.msg);
        alert("Username or password incorrect .. !");
        this.router.navigate(['/login']);
      }
    }
    )
  }

  storeData(token, userData) {
    localStorage.setItem("tokenId", token);
    localStorage.setItem("user", JSON.stringify(userData));

    this.authtoken = token;
    this.user = userData;
  }

  fetchUserData() {
    const user = localStorage.getItem("user");
    this.user_id = user;
    return JSON.parse(this.user_id).userid;
  }
}
