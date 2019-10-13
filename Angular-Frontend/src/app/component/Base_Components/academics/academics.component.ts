import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})


export class AcademicsComponent implements OnInit {
  images;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private ngFlashMessageService: NgFlashMessageService,
  ) { }
  CertificationForm = this.fb.group({
    name: ['', Validators.required],
  });
  ngOnInit() { }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    else{
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Select the Profile Image..!"],
        dismissible: true, 
        timeout: 2000,
        type: 'warning'
      });
    }
  }


  upload() {
    const formData = new FormData();

    
    formData.append('name', this.CertificationForm.value.name)
    formData.append('profileImage', this.images)

    if(this.images == null){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Select the Profile Image..!"],
        dismissible: true,
        timeout: 2000,
        type: 'danger'
      });
    }
    else{
      const url = "http://localhost:3000/academics/uploadfile";
  
      this.http.post(url, formData).subscribe(res => {
        console.log(res)
      });

    }
  }

  }
 

