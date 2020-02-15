import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

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
  mySubscription: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,

  ) { }
  ngOnInit() {
    if(this.cookies.logingstatus===true){
      var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
      this.router.navigate([myCookie.userid,'menu']);
    }
   }

  userLogin() {
    const user = {
      userid: this.userid,
      password: this.password
    };

    var url = "http://localhost:3000/users/login";

    if(user.userid == ''){
      let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("User ID is empty..! ", true ? "Retry" : undefined, config);
    }
    else if(user.password == ''){
      let config = new MatSnackBarConfig();
      config.duration = true ? 2000 : 0;
      this.snackBar.open("Password is Empty..! ", true ? "Retry" : undefined, config);
    }
    else{
      this.http.post<any>(url, user).subscribe(res => {
        
        
        if (res.state == true) {
          this.cookies.setCookie("userAuth", JSON.stringify(res.user), 1);
          var myCookie = JSON.parse(this.cookies.getCookie("userAuth"));
          var id = myCookie.usertype;
          
          if(id=="Administrator"){
            this.router.navigate([myCookie.userid,'admin_dashboard']);
            let config = new MatSnackBarConfig();
            config.duration = true ? 2000 : 0;
            this.snackBar.open("Successfully Logged In..! ", true ? "Done" : undefined, config);
          }else if(id){
            this.router.navigate([myCookie.userid,'menu']);
          }else{
            this.router.navigate(['/login']);
          }
        }
        else {
          console.log(res.msg);
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Username or Password Incorrect..! ", true ? "Retry" : undefined, config);
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
