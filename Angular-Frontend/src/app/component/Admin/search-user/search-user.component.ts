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
  filepath: String;
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
  UserDataForm : FormGroup;
  submitted = false;
  images;
  filename;
  userid;
  dataform: Boolean = false;  //sata division default didn't show
  propicName; //profile picture name variable
  
  ngOnInit() {
    this.UserForm = this.fb.group({
      userid: ['', Validators.required]
    });
    
    this.UserDataForm = this.fb.group({
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
    
  }

  searchUser() {
    this.userid = this.UserForm.value.userid;

    const url = "http://localhost:3000/users/searchUsers"

    this.http.get<any>(url + "/" + this.userid).subscribe(res => {
      if (res.state == false) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Error find in user..!  "],
          dismissible: true,
          timeout: 2000,
          type: 'warning'
        });
      }
      else {
        this.userdata = res.data;
        console.log(res.data.usertype);
        this.dataform = true;
        this.propicName = res.data.filepath        
      }
    })
  }

  /**************************************************** */


  get f() {
    return this.UserDataForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.UserDataForm.reset();
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
  updateUser() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.RegistrationForm.invalid) {
    //   return;
    // }
    // else {
      const formData = new FormData();

      formData.append('profileImage', this.images)
      formData.append('usertype', this.UserDataForm.value.usertype)
      formData.append('userid', this.UserDataForm.value.userid)
      formData.append('selectclass', this.UserDataForm.value.selectclass)
      formData.append('name', this.UserDataForm.value.name)
      formData.append('email', this.UserDataForm.value.email)
      formData.append('password', this.UserDataForm.value.password)
      formData.append('birthday', this.UserDataForm.value.birthday)
      formData.append('mobilenumber', this.UserDataForm.value.mobilenumber)
      formData.append('homenumber', this.UserDataForm.value.homenumber)
      formData.append('gender', this.UserDataForm.value.gender)
      formData.append('nationality', this.UserDataForm.value.nationality)
      formData.append('nicnumber', this.UserDataForm.value.nicnumber)
      formData.append('father', this.UserDataForm.value.father)
      formData.append('mother', this.UserDataForm.value.mother)
      formData.append('address', this.UserDataForm.value.address)

      /****************************************************** */
      console.log(formData);
      const url = 'http://localhost:3000/users/updateUser/';

      // if (this.images == null) {
      //   this.ngFlashMessageService.showFlashMessage({
      //     messages: ["Select the Profile Image..!"],
      //     dismissible: true,
      //     timeout: 2000,
      //     type: 'warning'
      //   });
      // }
      // else {
      //   this.http.post<any>(url+this.userid+"/"+this.filename, formData).subscribe(res => {
      //     if (res.state) {
      //       console.log(res.msg);
      //       this.ngFlashMessageService.showFlashMessage({
      //         messages: ["Successfully Updated..!"],
      //         dismissible: true,
      //         timeout: 2000,
      //         type: 'success',
      //       });
      //       this.router.navigate(['/login']);
      //     }
      //     else {
      //       this.ngFlashMessageService.showFlashMessage({
      //         messages: ["You are not Updated..!"],
      //         dismissible: true,
      //         timeout: 2000,
      //         type: 'warning'
      //       });
      //       this.router.navigate(['/register']);
      //     }
      //   });
      // }
    // }
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

  deleteUser() {

    const url1 = "http://localhost:3000/users/profImage/"
    const url2 = "http://localhost:3000/users/deleteUser/"
    console.log(this.propicName)
    if (this.propicName) {
      this.http.delete<any>(url1 + this.propicName).subscribe(res => {
        console.log(res);

      })
    }
    this.http.delete<any>(url2 + this.userid).subscribe(res => {
      if (res.state == true) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Successfully Deleted..! "],
          dismissible: true,
          timeout: 2000,
          type: 'success',
        });
      }
      else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Delete User Error..! "],
          dismissible: true,
          timeout: 2000,
          type: 'warnig',
        });
      }
    })
  }
}
