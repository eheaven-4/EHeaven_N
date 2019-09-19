import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  CertificationForm = new FormGroup({
    certName: new FormControl(''),

  });


  constructor() { }


  ngOnInit() {
  }

  //test
  hello(){
    console.log('hello world');
  }
}
