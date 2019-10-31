import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
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

  news: news[] = [];
  ngFlashMessage: any;

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
  ) { }

  // news form attributes
  NewsForm = this.fb.group({
    // userid: ['', Validators.required],
    topic: ['', Validators.required],
    newsSumery: ['', Validators.required],
    news: ['', Validators.required],
    date: ['', Validators.required],


  });

  ngOnInit() {

      const url = 'http://localhost:3000/news/view';
      this.http.get<any>(url).subscribe(res => {
        this.news = res;

      }, (err) => {
        console.log(err);
      });
  }

  // load the image as the button event and asign to  the images variable
  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.images = file;
    }
  }

  addnews() {

    // tslint:disable-next-line: prefer-const
    const myCookie = JSON.parse(this.cookies.getCookie('userAuth'));
    const userid = myCookie.userid;


    this.date = Date();

    const formData = new FormData();

    formData.append('newsImage', this.images);
    // formData.append('userid', this.NewsForm.value.userid);
    formData.append('topic', this.NewsForm.value.topic);
    formData.append('date' , this.NewsForm.value.date );
    formData.append('newsSumery', this.NewsForm.value.newsSumery);
    formData.append('news', this.NewsForm.value.news);


    const url = 'http://localhost:3000/news/add';

    if (this.images == null) {
      this.ngFlashMessageService.showFlashMessage({
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
            this.ngFlashMessageService.showFlashMessage({
              messages: ['Successfully added ..!'],
              dismissible: true,
              timeout: 2000,
              type: 'success',
              });

            window.location.reload();
            // this.router.navigate(['/news']);


          } else {
            this.ngFlashMessageService.showFlashMessage({
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
  delete(event, news_id) {

   // console.log(news_id);
    const mybtnId = news_id;

    const url = 'http://localhost:3000/news/delete';

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

