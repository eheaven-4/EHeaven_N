import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StringifyOptions } from 'querystring';

interface news {  // decalare interface class for load news attributes.
  _id: String;
  topic: String;
  newsSumery: String;
  news: String;
  date: String;
}

interface events{
  head: String;
  eventdetail:String;
  day:String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: news[] = [];
  events: events[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {

    const eventurl = 'http://localhost:3000/upcoming_event/topEvent';
    this.http.get<any>(eventurl).subscribe(res => {
      this.events = res.data;
      console.log(res.data)
    }, (err) => {
    console.log(err);
    });

    const url = 'http://localhost:3000/news/topNews';
    this.http.get<any>(url).subscribe(res => {
      this.news = res.data;
      console.log(res.data)
    }, (err) => {
      console.log(err);
    });


  }

}
