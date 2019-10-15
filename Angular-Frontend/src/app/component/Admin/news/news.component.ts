import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  images;

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  // news form attributes
  NewsForm = this.fb.group({
    userid: ['', Validators.required],
    topic: ['', Validators.required],
    newsSumery: ['', Validators.required],
    news: ['', Validators.required],
    date: ['', Validators.required],

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

  addnews() {
    const formData = new FormData();

    formData.append('newspic', this.images);
    formData.append('userid', this.NewsForm.value.userid);
    formData.append('topic', this.NewsForm.value.topic);
    formData.append('newsSumery', this.NewsForm.value.newsSumery);
    formData.append('news', this.NewsForm.value.news);

    var url = 'http://localhost:3000/news/add';

    // console.log(formData);

    if (this.images == null) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Select the Profile Image..!'],
        dismissible: true,
        timeout: 2000,
        type: 'warning'
      });
    } else {
      this.http.post<any>(url, formData).subscribe(res => {
        if (res.state) {
          console.log(res.msg);
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Successfully submited ..!'],
            dismissible: true,
            timeout: 2000,
            type: 'success',
          });

        } else {
          this.ngFlashMessageService.showFlashMessage({
            messages: ['News is not submited..!'],
            dismissible: true,
            timeout: 2000,
            type: 'warning'
          });

        }
      });
    }

}
}








