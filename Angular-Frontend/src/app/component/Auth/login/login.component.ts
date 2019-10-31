import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';
import { NgFlashMessageService } from 'ng-flash-messages';

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
    private ngFlashMessage: NgFlashMessageService
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
              this.ngFlashMessage.showFlashMessage({
                messages: ["Successfully Logged In..!"], 
                dismissible: true, 
                timeout: 2000,
                type: 'success',
              });
              // location.reload();
        }
        else{
          this.router.navigate(['/login']);
        }

      }
      else {
        console.log(res.msg);
        this.ngFlashMessage.showFlashMessage({
          messages: ["Username or password incorrect..!"], 
          dismissible: true, 
          timeout: 2000,
          type: 'warning',
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
