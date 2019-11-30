import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MycookiesService } from '../../Admin/mycookies.service';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { ConfirmationDialogComponent } from '../../Auth/confirmation-dialog/confirmation-dialog.component';

interface newsClass {  // decalare interface class for load news attributes.
  _id: String;
  topic: String;
  newsSumery: String;
  news: String;
  date: String;
  filepath: String;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  editform = false;

  images;
  date: string;
  attachment;
  filename;
  submitted = false;
  newsId: string;
  newspicname;
  dataform: Boolean = false;

  topic: string;
  newsSumery: string;
 // currentNews: string;

  news: newsClass[] = [];
  newsEdit : newsClass [] = [];
  NewsForm: FormGroup;
  // ngFlashMessage: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookies: MycookiesService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  // news form attributes

  ngOnInit() {
    this.NewsForm = this.fb.group({
      topic: ['', [Validators.required, Validators.maxLength(50)]],
      newsSumery: ['', [Validators.required, Validators.maxLength(400)]],
      news: ['', Validators.maxLength(800)],

    });

    const url = 'http://localhost:3000/news/view';
    this.http.get<any>(url).subscribe(res => {
      this.news = res;
      console.log(res);
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
      this.filename = file.name;
    }
  }
  // when edit button press
  onEdit(event, news_id) {
    this.editform = true;

    //const mybtnId = this.NewsForm.value.news_id;
    // this.newsId = this.NewsForm.value.newsId;

    console.log(news_id);

    const url = 'http://localhost:3000/news/editnews';

    this.http.get<any>(url + '/' + news_id).subscribe(res => {
      console.log(res);
      
      if (res.state == false) {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Error find in news..! ', true ? 'Retry' : undefined, config);
      } else {
        this.newsEdit = res.data;
        this.dataform = true;
        // this.newspicname = res.data.filepath;
      }
    });



    // this.newsId = news_id;
    // const _id = editNews._id;
    // const topic = editNews.topic;
    // const newsSumery = editNews.newsSumery;
    // const news = editNews.news;
    // this.editform=true;
    // this.NewsForm.setValue({
    //   'topic': topic,
    //   'newsSumery': newsSumery,
    //   'news': news,

    // });
}



  updatenews() {
    this.submitted = true;

    console.log('updating news')
    if (this.NewsForm.invalid) {
      return;
    } else{

        // tslint:disable-next-line: prefer-const
        // const myCookie = JSON.parse(this.cookies.getCookie('userAuth'));
        // const userid = myCookie.userid;


       // this.date = Date();

        const formData = new FormData();

        formData.append('newsImage', this.images);
        formData.append('topic', this.NewsForm.value.topic);
        formData.append('date', this.date);
        formData.append('newsSumery', this.NewsForm.value.newsSumery);
        formData.append('news', this.NewsForm.value.news);

        const url = 'http://localhost:3000/news/update';
        // console.log("url1===",url)

        if (this.images == null) {
          const config = new MatSnackBarConfig();
          config.duration = true ? 2000 : 0;
          this.snackBar.open('Please Select a Image..! ', true ? 'Retry' : undefined, config);
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              message: 'Are you sure want to update?',
              buttonText: {
                ok: 'Yes',
                cancel: 'No'
              }
            }
          });
          dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            console.log('confirmed' , confirmed );
            if (confirmed) {
              this.http.post<any>(url +  this.newsId + '/' + this.newspicname, formData).subscribe(res => {
               // console.log("url2===",url)
                console.log(res.msg);
                if (res.state) {
                  const config = new MatSnackBarConfig();
                  config.duration = true ? 2000 : 0;
                  this.snackBar.open('News Successfully Added..! ', true ? 'Done' : undefined, config);

                  window.location.reload();

                } else {
                  const config = new MatSnackBarConfig();
                  config.duration = true ? 2000 : 0;
                  this.snackBar.open('News is not Added..! ', true ? 'Retry' : undefined, config);
                  this.router.navigate(['/news']);
                }
              });
            }
          });
        }
      }

  }

  addnews() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.NewsForm.invalid) {
      return;
    } else {

      // tslint:disable-next-line: prefer-const
      const myCookie = JSON.parse(this.cookies.getCookie('userAuth'));
      const userid = myCookie.userid;


      this.date = Date();

      const formData = new FormData();

      formData.append('newsImage', this.images);
      formData.append('topic', this.NewsForm.value.topic);
      formData.append('date', this.date);
      formData.append('newsSumery', this.NewsForm.value.newsSumery);
      formData.append('news', this.NewsForm.value.news);


      const url = 'http://localhost:3000/news/add';

      if (this.images == null) {
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('Please Select a Image..! ', true ? 'Retry' : undefined, config);
      } else {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: 'Are you sure want to Add?',
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            }
          }
        });
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.http.post<any>(url, formData).subscribe(res => {
              console.log(res.msg);
              if (res.state) {
                const config = new MatSnackBarConfig();
                config.duration = true ? 2000 : 0;
                this.snackBar.open('News Successfully Added..! ', true ? 'Done' : undefined, config);

                window.location.reload();

              } else {
                const config = new MatSnackBarConfig();
                config.duration = true ? 2000 : 0;
                this.snackBar.open('News is not Added..! ', true ? 'Retry' : undefined, config);
                this.router.navigate(['/news']);
              }
            });
          }
        });
      }
    }
  }




delete(event, news_id, file_path) {

  // console.log(news_id);
  const mybtnId = news_id;
  let mybtnFile = file_path;

  const url = 'http://localhost:3000/news/delete';
  let urlDelete = 'http://localhost:3000/news/newsAttachment'; // notification attachment delete url

  // if there is a file in attachment call atachment file delteing request
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Are you sure want to Delete?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'
      }
    }
  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      if (mybtnFile) {
        this.http.delete(urlDelete + '/' + mybtnFile).subscribe(res => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });
      }

      this.http.delete(url + '/' + mybtnId).subscribe(res => {  // send delete the news to the server
        const config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open('News Successfully Deleted..! ', true ? 'Done' : undefined, config);
      }, (err) => {
        console.log(err);
      });
      window.location.reload();     // reload the page
    }
  });
}

}

