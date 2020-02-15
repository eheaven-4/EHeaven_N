import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

interface certificateRequested {
  userid: String,
  certName: String,
  certType: String,
  examName: String,
  examYear: String,
  examIndex: String,
  reqDate: String,
  state: String
}

interface subjectsArray {
  subId: String,
  subName: String,
}

@Component({
  selector: 'app-prepare-certification',
  templateUrl: './prepare-certification.component.html',
  styleUrls: ['./prepare-certification.component.scss']
})
export class PrepareCertificationComponent implements OnInit {
  cookie = JSON.parse(this.cookies.getCookie('userAuth'));
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cookies: MycookiesService,
  ) { }

userType
subjectnamesAl: subjectsArray[] = []
subjectnamesOl: subjectsArray[] = []


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
  'A DISTINCTION PASS',
  'B VERY GOOD PASS',
  'C CREDI PASS',
  'S ORDINARY PASS',
  'W WEAK',
  '+ ABSENT',
  'X Not Finalized',
  'N Results Nullified',
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

AlCertForm = this.fb.group({
  certDetails: this.fb.group({
    studentName: ['', Validators.required],
    examYear: ['', Validators.required],
    centerNo: ['', Validators.required],
    indexNo: ['', Validators.required],
    medium: ['', Validators.required],
  }),
  subjects: this.fb.array([this.subjects]),
  zscore: ['', Validators.required],
  districtrank: ['', Validators.required],
  islandrank: ['', Validators.required],

});

get subjects(): FormGroup {
  return this.fb.group({
    subjectName: ['', Validators.required],
    grade: ['', Validators.required],
  });
}

addSubject() {
  (this.AlCertForm.get('subjects') as FormArray).push(this.subjects);
}

// ********************* O/L Certificate Form ****************************************************************************

// tslint:disable-next-line: member-ordering
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
      certState : 'Pending'
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
    certState : 'Pending'
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
    certState : 'Pending'
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
    zscore: this.AlCertForm.value.zscore,
    districtrank: this.AlCertForm.value.districtrank,
    islandrank: this.AlCertForm.value.islandrank,
    certState : 'Pending',
  };
  var url = 'http://localhost:3000/certification/alcert';

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
    certState : 'Pending',
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

/***********************************Accept/Reject Certificate Requests(Principal) ************************************/

acceptCert(certRequest){
  // console.log(certRequest._id);
  var objId = certRequest._id;
  console.log(objId);
  var url = "http://localhost:3000/certification/acceptCert/"+certRequest._id; //accept certification requests

  this.http.post(url,null).subscribe(res => {
    alert('Successful');
  }, (err) => {
    console.log(err);
  });

  window.location.reload();

}

rejectCert(certRequest){
  // console.log(certRequest._id);
  var objId = certRequest._id;
  var url = "http://localhost:3000/certification/deleteCert"; //reject certification requests

  this.http.delete(url + '/' + objId).subscribe(res => {

  }, (err) => {
    console.log(err);
  });

  window.location.reload();

}

completeCert(certRequest){
  // console.log(certRequest._id);
  var objId = certRequest._id;
  console.log(objId);
  var url = "http://localhost:3000/certification/completeCert/"+certRequest._id; //accept certification requests

  this.http.post(url,null).subscribe(res => {
    alert('Successful');
  }, (err) => {
    console.log(err);
  });

  window.location.reload();

}


pendingCertList : certificateRequested [] = [];  //prepared certificates
pendingCertList1 : certificateRequested [] = []; //prepared - principal approval not taken

completedCertList1 : certificateRequested [] = []; //completed certification - student status
completedCertList2 : certificateRequested [] = []; //completed certification - character
completedCertList3 : certificateRequested [] = []; //completed certification - leaving
completedCertList4 : certificateRequested [] = []; //completed certification - educational

  ngOnInit() {

    let myCookie = JSON.parse(this.cookies.getCookie('userAuth'));
    this.userType = myCookie.usertype;
    var pendingUrl1 = "http://localhost:3000/certification/pendingCertList1";   //for principal

    this.http.get<any>(pendingUrl1).subscribe(res => {
      console.log(res);
      this.pendingCertList1   = res;

    });

    var pendingUrl = "http://localhost:3000/certification/pendingCertList";   //for admin

    this.http.get<any>(pendingUrl).subscribe(res => {
      console.log(res);
      this.pendingCertList   = res;

    });


    var completedUrl1 = "http://localhost:3000/certification/completedCertList1";   //student status

    this.http.get<any>(completedUrl1).subscribe(res => {
      console.log(res);
      this.completedCertList1   = res;

    });

    var completedUrl2 = "http://localhost:3000/certification/completedCertList2";   //character

    this.http.get<any>(completedUrl2).subscribe(res => {
      console.log(res);
      this.completedCertList2   = res;

    });

    var completedUrl3 = "http://localhost:3000/certification/completedCertList3";   //leaving

    this.http.get<any>(completedUrl3).subscribe(res => {
      console.log(res);
      this.completedCertList3   = res;

    });

    var completedUrl4 = "http://localhost:3000/certification/completedCertList4";   //educational

    this.http.get<any>(completedUrl4).subscribe(res => {
      console.log(res);
      this.completedCertList4   = res;

    });

    const alUrl = "http://localhost:3000/certification/getAL"           //AL subjects list
    this.http.get<any>(alUrl).subscribe(res => {
      this.subjectnamesAl = res.data;
    });

    const olUrl = "http://localhost:3000/certification/getOL"           //OL subjects list
    this.http.get<any>(olUrl).subscribe(res => {
      this.subjectnamesOl = res.data;
    });
  }


    }




