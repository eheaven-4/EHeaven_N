import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      alert("sex")
    }
  }


  upload() {

    const formData = new FormData();

    formData.append('name', this.CertificationForm.value.name)
    formData.append('profileImage', this.images)


    const url = "http://localhost:3000/academics/uploadfile";

    this.http.post(url, formData).subscribe(res => {
      console.log(res)
    });
  }

  }
 

