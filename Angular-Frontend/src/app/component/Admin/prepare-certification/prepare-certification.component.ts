import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-prepare-certification',
  templateUrl: './prepare-certification.component.html',
  styleUrls: ['./prepare-certification.component.scss']
})
export class PrepareCertificationComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  StudentStatusForm = this.fb.group({
    studentName: ['', Validators.required],
    admissionNum: ['', Validators.required],
    dateofAdmission: ['', Validators.required],
    currentStatus: ['', Validators.required],
    description: ['', Validators.required],

  });

  ngOnInit() {

  }

}
