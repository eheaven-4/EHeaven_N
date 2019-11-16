import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MycookiesService } from '../../Admin/mycookies.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})


export class AcademicsComponent implements OnInit {

  faFile = faFile;
  
  constructor(
    private http: HttpClient,
    private ngFlashMessageService: NgFlashMessageService,
    private cookies: MycookiesService,
  ) { }

 

  ngOnInit() {
    
  }
}


