import { Component, OnInit } from '@angular/core';
// import { NgFlashMessageService } from 'ng-flash-messages';
// import { FormBuilder, Validators } from '@angular/forms';
import { AttendenceService } from '../../attendance/attendence.service';
import { ClassRoom } from '../../../Admin/class-registration/Classroom';
import { HttpClient } from '@angular/common/http';

export class Mark {
  userid: string;
  mark: Number;
  name:string;
}
export class Marksheet {
  classname: string;
  year: string;
  term: string;
  subject:string;
  marks: Array<Mark>;
}


@Component({
  selector: 'app-mark-bulk-add',
  templateUrl: './mark-bulk-add.component.html',
  styleUrls: ['./mark-bulk-add.component.scss']
})
export class MarkBulkAddComponent implements OnInit {
  flag = false;
  fileToUpload: File = null;
  Stringdata = '';
  marks = [];
  userVisibale;
  mySubject;
  classlist: Array<ClassRoom>;
  years = [2018, 2019, 2020, 2021];
  terms = [1, 2, 3]
  constructor(
    private attendanceservice: AttendenceService,
    private _http: HttpClient
  ) { }

  ngOnInit() {

    this.attendanceservice.getclass()
      .subscribe((data: ClassRoom[]) => {
        this.classlist = data;
        console.log(this.classlist);
      });
      const url = "http://localhost:3000/class_management/getSubjects"
      this._http.get<any>(url).subscribe(res => {
        this.mySubject = res.data;
      });
  }
  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
  }
  bulkRegistration(classname, year, term,subje) {
    let fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload);

    fileReader.onload = (e) => {
      this.Stringdata = fileReader.result.toString();
      console.log(this.Stringdata);
      var Stringmark = this.Stringdata.split('\n');
      console.log(Stringmark.length);

      console.log(Stringmark);
      for (var i = 0; i < Stringmark.length; i++) {
        if (Stringmark[i] == '\n') {
          console.log(Stringmark[i]);
          break;
        }
        var markstr = Stringmark[i].split(',');

        var mark = new Mark();
        mark.userid = markstr[0]
        mark.mark = Number(markstr[1]);
        mark.name=markstr[2];
        console.log(mark);
        this.marks.push(mark);
      }
      var temp = new Marksheet();
      temp.classname = classname;
      temp.term = term;
      temp.year = year;
      temp.marks = this.marks;
      temp.subject=subje;
      console.log(temp);
      this._http.post<any>('http://localhost:3000/mark/addLog',temp)
        .subscribe(
          data => console.log('Success', data),
          error => console.error('Error!', error)
        );
      console.log("hellp");
    }
  }
}



