import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})


export class AcademicsComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }
  
  ngOnInit() {

  }
 
}
