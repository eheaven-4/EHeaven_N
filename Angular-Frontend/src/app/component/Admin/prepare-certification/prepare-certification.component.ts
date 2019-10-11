import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray, Form } from '@angular/forms';
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


// examination Medium
mediums = [
  'English',
  'Sinhala',
  'Tamil',
];

// examinations years
yearofExam = [
  '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'
];

// examination Grades
grades = [
  'A',
  'B',
  'C',
  'S',
  'F',
];
  // ********************* Student Status Form ****************************************************************************

  StudentStatusForm = this.fb.group({
    studentName: ['', Validators.required],
    admissionNum: ['', Validators.required],
    dateofAdmission: ['', Validators.required],
    description: ['', Validators.required],

  });

 // ********************* Character Certificate Form **********************************************************************

 CharacterCertForm = this.fb.group({
  studentName: ['', Validators.required],
  admissionNum: ['', Validators.required],
  dateofAdmission: ['', Validators.required],
  dateofLeaving: ['', Validators.required],
  lastClass: ['', Validators.required],
  lastExam: ['', Validators.required],
  examYear: ['', Validators.required],
  academicStatus: ['', Validators.required],
  moral: ['', Validators.required],
  leadership: ['', Validators.required],
  societies: ['', Validators.required],
  sports: ['', Validators.required],
});

// academic performance categories
academicPerformance = [
  'Not satisfactory',
  'Satisfactory',
  'Moderate',
  'Excellent'
];

// moral conduct of the student
moralConduct = [
  'Satisfactory',
  'Good',
  'Excellent'
];

// ********************* Leaving Certificate Form ************************************************************************

LeavingCertForm = this.fb.group({
  studentName: ['', Validators.required],
  admissionNum: ['', Validators.required],
  dateofAdmission: ['', Validators.required],
  dateofLeaving: ['', Validators.required],
  dateofBirth: ['', Validators.required],
  fathersName: ['', Validators.required],
  fathersOccupation: ['', Validators.required],
  fathersAddress: ['', Validators.required],
  religion: ['', Validators.required],
  schoolName: ['', Validators.required],
  schoolType: ['', Validators.required],
  cause: ['', Validators.required],
  lastClass: ['', Validators.required],
  subjects: ['', Validators.required],
});

religions = [
  'Buddhist',
  'Christian',
  'Islamic',
  'Hindu',
  'Other'
];

schooltypes = [
  'English',
  'Bilingual',
  'Vernaular',
];

// ********************* A/L Certificate Form ****************************************************************************

// subject Numbers
subjectnumbersAl = [
  //insert AL subject Numbers here
];

AlCertForm = this.fb.group({
  certDetails: this.fb.group({
    studentName: ['', Validators.required],
    examYear: ['', Validators.required],
    centerNo: ['', Validators.required],
    indexNo: ['', Validators.required],
    medium: ['', Validators.required],
  }),
  subjects: this.fb.array([this.subjects])
});

get subjects(): FormGroup {
  return this.fb.group({
    subjectName: ['', Validators.required],
    // subjectNumber: ['', Validators.required],
    grade: ['', Validators.required],
  });
}

addSubject() {
  (this.AlCertForm.get('subjects') as FormArray).push(this.subjects);
}

// ********************* O/L Certificate Form ****************************************************************************

// subject numbers ol
subjectnumbersOl = [
  //insert AL subject Numbers here
];

OlCertForm = this.fb.group({
  certDetails: this.fb.group({
    studentName: ['', Validators.required],
    examYear: ['', Validators.required],
    centerNo: ['', Validators.required],
    indexNo: ['', Validators.required],
  }),
  subjectsOl: this.fb.array([this.subjectsOl])
});

get subjectsOl(): FormGroup {
  return this.fb.group({
    subjectName: ['', Validators.required],
    // subjectNumber: ['', Validators.required],
    medium: ['', Validators.required],
    grade: ['', Validators.required],
  });
}

addSubjectOl() {
  (this.OlCertForm.get('subjectsOl') as FormArray).push(this.subjectsOl);
}
// ******************************** Submit student status ****************************************************************
  submitStudentstatus() {

    const studentStatusApproval = {
      studentName: this.StudentStatusForm.value.studentName,
      admissionNum: this.StudentStatusForm.value.admissionNum,
      dateofAdmission: this.StudentStatusForm.value.dateofAdmission,
      description: this.StudentStatusForm.value.description,
      state : 'Pending'
    };

    var url = 'http://localhost:3000/certification/studentstatus'

    this.http.post<any>(url, studentStatusApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.StudentStatusForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
    console.log(studentStatusApproval);

    window.location.reload();

  }

// ******************************** Submit Character certificate *********************************************************
submitCharacterCert() {

  const characterCertApproval = {
    studentName: this.CharacterCertForm.value.studentName,
    admissionNum: this.CharacterCertForm.value.admissionNum,
    dateofAdmission: this.CharacterCertForm.value.dateofAdmission,
    dateofLeaving: this.CharacterCertForm.value.dateofLeaving,
    lastClass: this.CharacterCertForm.value.lastClass,
    lastExam: this.CharacterCertForm.value.lastExam,
    examYear: this.CharacterCertForm.value.examYear,
    academicStatus: this.CharacterCertForm.value.academicStatus,
    moral: this.CharacterCertForm.value.moral,
    leadership: this.CharacterCertForm.value.leadership,
    societies: this.CharacterCertForm.value.societies,
    sports: this.CharacterCertForm.value.sports,
  };
  var url = 'http://localhost:3000/certification/charactercert'

  this.http.post<any>(url, characterCertApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.CharacterCertForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
  console.log(characterCertApproval);

  // window.location.reload();

}

// ******************************** Submit Leaving certificate ***********************************************************
submitLeavingCert() {

  const leavingCertApproval = {
    studentName: this.LeavingCertForm.value.studentName,
    admissionNum: this.LeavingCertForm.value.admissionNum,
    dateofAdmission: this.LeavingCertForm.value.dateofAdmission,
    dateofLeaving: this.LeavingCertForm.value.dateofLeaving,
    dateofBirth: this.LeavingCertForm.value.dateofBirth,
    fathersName: this.LeavingCertForm.value.fathersName,
    fathersOccupation: this.LeavingCertForm.value.fathersOccupation,
    fathersAddress: this.LeavingCertForm.value.fathersAddress,
    religion: this.LeavingCertForm.value.religion,
    schoolName: this.LeavingCertForm.value.schoolName,
    schoolType: this.LeavingCertForm.value.schoolType,
    cause: this.LeavingCertForm.value.cause,
    lastClass: this.LeavingCertForm.value.lastClass,
    subjects: this.LeavingCertForm.value.subjects,
  };
  var url = 'http://localhost:3000/certification/leavingcert'

  this.http.post<any>(url, leavingCertApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.LeavingCertForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
  console.log(leavingCertApproval);

  window.location.reload();

}

// ******************************** Submit A/L certificate ***************************************************************
submitAlCert() {

  const alCertApproval = {
    studentName: this.AlCertForm.value.certDetails.studentName,
    examYear: this.AlCertForm.value.certDetails.examYear,
    centerNo: this.AlCertForm.value.certDetails.centerNo,
    indexNo: this.AlCertForm.value.certDetails.indexNo,
    medium: this.AlCertForm.value.certDetails.medium,
    subjects: this.AlCertForm.value.subjects,
  };
  var url = 'http://localhost:3000/certification/alcert'

  this.http.post<any>(url, alCertApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.AlCertForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
  console.log(alCertApproval);

  window.location.reload();

}

// ******************************** Submit O/L certificate ***************************************************************
submitOlCert() {

  const olCertApproval = {
    studentName: this.OlCertForm.value.certDetails.studentName,
    examYear: this.OlCertForm.value.certDetails.examYear,
    centerNo: this.OlCertForm.value.certDetails.centerNo,
    indexNo: this.OlCertForm.value.certDetails.indexNo,
    subjectsOl: this.OlCertForm.value.subjectsOl,
  };
  var url = 'http://localhost:3000/certification/olcert'

  this.http.post<any>(url, olCertApproval).subscribe(res => {
          if (res.state) {
            console.log(res.msg);
            alert('Successful');
            this.OlCertForm.reset();
            this.router.navigate(['/prepare_certification']);
          } else {
            console.log(res.msg);
            alert('Error!! Try Again');
            this.router.navigate(['/prepare_certification']);
          }
        });
  console.log(olCertApproval);

  window.location.reload();

}



  ngOnInit() {

  }

}
