import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

interface user {
  _id: String;
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
}
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
  ) { }
  userdata: user[] = [];
  UserForm: FormGroup;
  submitted = false;
  images;
  filename;
  userid;
  dataform : Boolean = false;

  RegistrationForm = this.fb.group({
    usertype: ['', Validators.required],
    userid: ['', Validators.required],
    selectclass: [''],
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    birthday: ['', Validators.required],
    mobilenumber: [''],
    homenumber: [''],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    nicnumber: [''],
    father: [''],
    mother: [''],
    address: ['', Validators.required],
  });

  ngOnInit() {
    this.UserForm = this.fb.group({
      userid: ['', Validators.required]
    });
  }

  searchUser() {
    this.userid = this.UserForm.value.userid;

    const url = "http://localhost:3000/users/searchUsers"

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      this.userdata = res;
      console.log(res);
      this.dataform = true;
    })
  }
  // load the image as the button event and asign to  the images variable
  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.images = file;
      this.filename = file.name;
      console.log(this.filename)
    }
  }
  /**************************************************** */


  get f() {
    return this.RegistrationForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.RegistrationForm.reset();
  }


  /**************************************************** */
  updateUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.RegistrationForm.invalid) {
      return;
    }
    else {
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
            // this.ngProgress.done();
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


  // public imagePath;
  // imgURL: any;
  // public message: string;

  // preview(files) {
  //   if (files.length === 0)
  //     return;
 
  //   // var mimeType = files[0].type;
  //   // if (mimeType.match(/image\/*/) == null) {
  //   //   this.message = "Only images are supported.";
  //   //   return;
  //   // }
 
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }

  deleteUser(){
    
  }
}
