import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


interface classTimeTable {
  _id:String,
  className: String,
  classTeacher: String,
  monday: [{
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
  }],
  tuesday: [{
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
  }],

  wednesday: [{
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
  }],

  thursday: [{
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
  }],

  friday: [{
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
  }]
}

@Component({
  selector: 'app-view-time-tables',
  templateUrl: './view-time-tables.component.html',
  styleUrls: ['./view-time-tables.component.scss']
})
export class ViewTimeTablesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  classTT: classTimeTable[] = [];
  resetPasswordDiv = false
  id
  submitted = false;
  dataform
  SearchForm = this.fb.group({
    id: ['', Validators.required]
  });
  get f() {
    return this.SearchForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.SearchForm.reset();
  }

  ngOnInit() {
  }

  searchTeacherTimeTable() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.SearchForm.invalid) {
      return;
    } else {
      const url = "http://localhost:3000/class_management/getTimetable"

      this.http.get<any>(url + "/" + this.id).subscribe(res => {
        this.classTT = res;
        this.dataform = true;
        console.log(this.classTT);
        
      })
    }
  }

  searchClassTimeTable() { }

}
