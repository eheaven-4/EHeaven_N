import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MycookiesService } from '../../Admin/mycookies.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

interface lecSlide {
  _id: String,
  userid: String,
  teachername: String,
  subject: String,
  attachmenttype: String,
  class: String,
  path: String
}

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})


export class AcademicsComponent implements OnInit {

  faFile = faFile;
  lecSlide: lecSlide[] = []
  userType

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    var subject = this.route.snapshot.paramMap.get("sbjName")
    var userCookies = JSON.parse(this.cookies.getCookie("userAuth"))
    this.userType = userCookies.usertype
    var userId = userCookies.userid
    var className = userCookies.selectclass
    console.log(className);

    const url1 = "http://localhost:3000/academics/acad&other&attachment/"
    const url2 = "http://localhost:3000/academics/acad&stu&attachment/"

    if (this.userType == 'Administrator' || this.userType == 'Teacher') {
      this.http.get<any>(url1 + userId + '/' + subject).subscribe(res => {
        this.lecSlide = res.data
        console.log(this.lecSlide);

      })
    }
    if (this.userType == 'Student' || this.userType == 'Parent') {
      this.http.get<any>(url2 + className + '/' + subject).subscribe(res => {
        this.lecSlide = res.data
        console.log(this.lecSlide);

      })
    }

  }
}


