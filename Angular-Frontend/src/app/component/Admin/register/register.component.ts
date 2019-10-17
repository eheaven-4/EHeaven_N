import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  images;
  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  // registratin form attributes
  RegistrationForm = this.fb.group({
    usertype: ['', Validators.required],
    userid: ['', Validators.required],
    selectclass: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthday: ['', Validators.required],
    mobilenumber: ['', Validators.required],
    homenumber: ['', Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    nicnumber: ['', Validators.required],
    father: ['', Validators.required],
    mother: ['', Validators.required],
    address: ['', Validators.required],
  });

  ngOnInit() {
  }
  // load the image as the button event and asign to  the images variable
  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.images = file;
    }
  }
  /**************************************************** */
  registerUser() {
    const formData = new FormData();

    formData.append('profileImage', this.images)
    formData.append('usertype', this.RegistrationForm.value.usertype)
    formData.append('userid', this.RegistrationForm.value.userid)
    formData.append('selectclass', this.RegistrationForm.value.selectclass)
    formData.append('name', this.RegistrationForm.value.name)
    formData.append('email', this.RegistrationForm.value.email)
    formData.append('password', this.RegistrationForm.value.password)
    formData.append('birthday', this.RegistrationForm.value.birthday)
    formData.append('mobilenumber', this.RegistrationForm.value.mobilenumber)
    formData.append('homenumber', this.RegistrationForm.value.homenumber)
    formData.append('gender', this.RegistrationForm.value.gender) 
    formData.append('nationality', this.RegistrationForm.value.nationality)
    formData.append('nicnumber', this.RegistrationForm.value.nicnumber)
    formData.append('father', this.RegistrationForm.value.father)
    formData.append('mother', this.RegistrationForm.value.mother)
    formData.append('address', this.RegistrationForm.value.address)

    /****************************************************** */
    console.log(formData);
    const url = 'http://localhost:3000/users/register';

    if (this.images == null) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Select the Profile Image..!"],
        dismissible: true,
        timeout: 2000,
        type: 'warning'
      });
    }
    else {
      this.http.post<any>(url, formData).subscribe(res => {
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
}
