import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MycookiesService } from '../../Admin/mycookies.service';

interface news {  // decalare interface class for load notification attributes.
  _id: String;
  topic: String;
  newsSumery: String;
  news: String;
  date: String;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  images;
  date: string;
  attachment;
  filename;
  submitted = false;

  news: news[] = [];
  NewsForm: FormGroup;
  // ngFlashMessage: any;

  constructor(
    private ngFlashMessage: NgFlashMessageService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
  ) { }

  // news form attributes

  ngOnInit() {
    this.NewsForm = this.fb.group({
      topic: ['', [Validators.required, Validators.maxLength(20)]],
      newsSumery: ['', [Validators.required, Validators.maxLength(400)]],
      news: ['', Validators.maxLength(800)],
    });

    const url = 'http://localhost:3000/news/view';
    this.http.get<any>(url).subscribe(res => {
      this.news = res;
      console.log(res)
    }, (err) => {
      console.log(err);
    });
  }

  get f() {
    return this.NewsForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.NewsForm.reset();
  }

  // load the image as the button event and asign to  the images variable
  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.images = file;
      this.filename = file.name
    }
  }

  addnews() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.NewsForm.invalid) {
      return;
    }
    else {

      // tslint:disable-next-line: prefer-const
      const myCookie = JSON.parse(this.cookies.getCookie('userAuth'));
      const userid = myCookie.userid;


      this.date = Date();

      const formData = new FormData();

      formData.append('newsImage', this.images);
      // formData.append('userid', this.NewsForm.value.userid);
      formData.append('topic', this.NewsForm.value.topic);
      formData.append('date', this.date);
      formData.append('newsSumery', this.NewsForm.value.newsSumery);
      formData.append('news', this.NewsForm.value.news);


      const url = 'http://localhost:3000/news/add';

      if (this.images == null) {
        this.ngFlashMessage.showFlashMessage({
          messages: ['Select the Profile Image..!'],
          dismissible: true,
          timeout: 2000,
          type: 'warning'
        });
      } else {
        // console.log(formData)
        this.http.post<any>(url, formData).subscribe(res => {
          console.log(res.msg);
          if (res.state) {
            this.ngFlashMessage.showFlashMessage({
              messages: ['Successfully added ..!'],
              dismissible: true,
              timeout: 2000,
              type: 'success',
            });

            window.location.reload();
            // this.router.navigate(['/news']);


          } else {
            this.ngFlashMessage.showFlashMessage({
              messages: ['News is not add..!'],
              dismissible: true,
              timeout: 2000,
              type: 'warning'
            });
            this.router.navigate(['/news']);
          }
        });
      }
    }
  }
  delete(event, news_id, file_path) {

    // console.log(news_id);
    const mybtnId = news_id;
    var mybtnFile = file_path;

    const url = 'http://localhost:3000/news/delete';
    var urlDelete = "http://localhost:3000/news/newsAttachment"; //notification attachment delete url

    //if there is a file in attachment call atachment file delteing request
    if (mybtnFile) {
      this.http.delete(urlDelete + '/' + mybtnFile).subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err)
      });
    }

    this.http.delete(url + '/' + mybtnId).subscribe(res => {  // send delete the news to the server
      this.ngFlashMessage.showFlashMessage({
        messages: ['Successfully Added ..!'],
        dismissible: true,
        timeout: 2000,
        type: 'success',
      });
    }, (err) => {
      console.log(err);
    });

    window.location.reload();     // reload the page
  }

}

