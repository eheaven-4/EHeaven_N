import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';

@Component({
  selector: 'app-academic-subject',
  templateUrl: './academic-subject.component.html',
  styleUrls: ['./academic-subject.component.scss']
})
export class AcademicSubjectComponent implements OnInit {

  subjectNames = ['Maths', 'Science', 'English']

  constructor(
    private router: Router,
    private cookies: MycookiesService
  ) { }

  ngOnInit() {
  }


  searchSubject() {
    var userCookie = JSON.parse(this.cookies.getCookie("userAuth"));
    var id = userCookie.userid;
    this.router.navigate(['/academics' + '/' + id]);
  }
}

