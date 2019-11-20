import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.scss']
})
export class BulkaddComponent {
  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  // file;
  // constructor(
  //   private ngFlashMessageService: NgFlashMessageService,
  //   private router: Router,
  //   private http: HttpClient,
  //   private fb: FormBuilder
  // ) { }

  // bulkFileForm = this.fb.group({
  //   name: ['', Validators.required],
  // });

  // ngOnInit() { }
  
  // selectFile(event) {
  //   if (event.target.files.length > 0) {  // check the file is select or not.
  //     const file = event.target.files[0];
  //     this.file = file;
  //   }
  // }
  // bulkRegistration() {
  //   /**************************************************** */
    
  //     const formData = new FormData();

  //     formData.append('bulk_req_file', this.file)
  //     formData.append('name', this.bulkFileForm.value.name)
      

  //     /****************************************************** */
  //     console.log(formData);
  //     const url = 'http://localhost:3000/users/bulkRegistration';

  //     if (this.file == null) {
  //       this.ngFlashMessageService.showFlashMessage({
  //         messages: ["Select a File..!"],
  //         dismissible: true,
  //         timeout: 2000,
  //         type: 'warning'
  //       });
  //     }
  //     else {
  //       this.http.post<any>(url, formData).subscribe(res => {
  //         if (res.state) {
  //           console.log(res.msg);
  //           this.ngFlashMessageService.showFlashMessage({
  //             messages: ["Successfully Registered..!"],
  //             dismissible: true,
  //             timeout: 2000,
  //             type: 'success',
  //           });
  //           this.router.navigate(['/register']);
  //         }
  //         else {
  //           this.ngFlashMessageService.showFlashMessage({
  //             messages: ["You are not Registerd..!"],
  //             dismissible: true,
  //             timeout: 2000,
  //             type: 'warning'
  //           });
  //           this.router.navigate(['/register']);
  //         }
  //       });
  //     }
  //   }
  }
