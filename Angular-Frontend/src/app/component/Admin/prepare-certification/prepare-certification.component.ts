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


  // ********************* Student Status Form *********************

  StudentStatusForm = this.fb.group({
    studentName: ['', Validators.required],
    admissionNum: ['', Validators.required],
    dateofAdmission: ['', Validators.required],
    description: ['', Validators.required],

  });

 // ********************* Character Certificate Form *********************

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

moralConduct = [
  'Satisfactory',
  'Good',
  'Excellent'
];

// ********************* Leaving Certificate Form *********************

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


// ******************************** Submit student status form *********************************
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

// ******************************** Submit Character form *********************************
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

  window.location.reload();

}

  ngOnInit() {

  }
}
