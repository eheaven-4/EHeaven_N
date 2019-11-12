import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
          // window.location.reload();     //reload the page
          this.router.navigate(['/academic_subject' + '/' + id]);
          let config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open("Successfully Logged In..! ", true ? "Done" : undefined, config);
              // location.reload();
        }
        else{
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
