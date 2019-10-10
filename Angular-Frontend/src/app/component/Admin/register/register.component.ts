import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { all } from 'q';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usertype: String;
  userid: String;
  selectclass: String;
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

  images;
  constructor(
    // private authService: AuthService, 
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  /**************************************************** */
  registerUser() {
    const formData = new FormData();
    const user = {
      usertype: this.usertype,
      userid: this.userid,
      selectclass: this.selectclass,
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

    formData.append('profileImage', this.images)

    /****************************************************** */
    	
    var url = "http://localhost:3000/users/register";

    this.http.post<any>(url, user).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Successfully Registered..!"], 
          dismissible: true, 
          timeout: 2000,
          type: 'success',
        });
        this.router.navigate(['/login']);
      }
      else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["You are not Registerd..!"],
          dismissible: true, 
          timeout: 2000,
          type: 'warning'
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
