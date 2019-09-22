import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

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
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService
  ) { }

  ngOnInit() { }

  userLogin() {
    const user = {
      userid: this.userid,
      password: this.password
    };

    var url = "http://localhost:3000/users/login";

    this.http.post<any>(url, user).subscribe(res => {
      
      if (res.state == true) {
        // this.storeData(res.token, res.user);
        this.cookies.setCookie("userAuth", JSON.stringify(res.user), 1);
        var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
        console.log(myCookie.userid);
        var id = myCookie.userid;

        if(id){
          this.router.navigate(['/academics' + '/' + id]);
        }
        else{
          this.router.navigate(['/login']);
        }

      }
      else {
        console.log(res.msg);
        alert("Username or password incorrect .. !");
        this.router.navigate(['/login']);
      }
    });
  }

  // storeData(token, userData) {
  //   localStorage.setItem("tokenId", token);
  //   localStorage.setItem("user", JSON.stringify(userData));

  //   this.authtoken = token;
  //   this.user = userData;
  // }

  // fetchUserData() {
  //   const user = localStorage.getItem("user");
  //   this.user_id = user;
  //   return JSON.parse(this.user_id).userid;
  // }

}
