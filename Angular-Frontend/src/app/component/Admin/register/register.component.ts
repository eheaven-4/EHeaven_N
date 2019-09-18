import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usertype: String;
  userid: String;
  name: String;
  email: String;
  password: String;
  birthday: String;
  mobilenumber: String;
  homenumber: String;
  gender: String;
  nationality: String;
  nicnumber: String;
  father: String;
  mother: String;
  address: String;

  constructor(
    // private authService: AuthService, 
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }


  /**************************************************** */
  registerUser() {
    const user = {
      usertype: this.usertype,
      userid: this.userid,
      name: this.name,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      mobilenumber: this.mobilenumber,
      homenumber: this.homenumber,
      gender: this.gender,
      nationality: this.nationality,
      nicnumber: this.nicnumber,
      father: this.father,
      mother: this.mother,
      address: this.address,
    }

    /****************************************************** */


    var url = "http://localhost:3000/users/register";
    this.http.post<any>(url, user).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        alert("Successfully registerd");
        this.router.navigate(['/login']);
      }
      else {
        // this.ngFlashMessageService.showFlashMessage({
        //   messages: ["You are not Registerd"],
        //   dismissible: true, 
        //   timeout: 2000,
        //   type: 'warning'
        // });
        console.log(res.msg);
        alert("Successfully registerd");
        this.router.navigate(['/register']);
      }
    });
  }
}
