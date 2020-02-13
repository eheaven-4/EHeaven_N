import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

// subject names and numbers a-level
subjectnamesAl = [
  '01   Physics',
  '02   Chemistry',
  '07   Mathematics',
  '08   Agricultural Science',
  '09   Biology',
  '10   Combine Mathematics',
  '11   Higher Mathematics',
  '*12  Common Genaral Test',
  '**13   General English',
  '14   Civil Technology',
  '15   Mechanical Technology',
  '16   Electrical,Electronic and Information Technolgy',
  '17   Food Technology',
  '18   Agro Technology',
  '19   Bio-Resource Technolgy',
  '20   Information and Communication Technology',
  '21   Economics',
  '22   Geography',
  '23   Political Science',
  '24   Logic and Scientific Method',
  '25A   History of India',
  '25B   History of Europe',
  '25C   History of Modern World',
  '28   Home Economics',
  '29   Cpmmunication and Media Studies',
  '31   Business Statistics',
  '32   Business Studies',
  '33   Accounting',
  '41   Buddhism',
  '42   Hinduism',
  '43   Christianity',
  '44   Islam',
  '45   Buddhist Civilization',
  '46   Hindu Civilization',
  '47   Islamic Civilization',
  '48   Greek and Roman Civilization',
  '49   Christian Civilization',
  '51   Art',
  '52   Dancing(Indigenous)',
  '53   Dancing(Bharatha)',
  '54   Oriental Music',
  '55   Carnatic Music',
  '56   Western Music',
  '57   Drama and Theatre(Sinhala)',
  '58   Drama and Theatre(Tamil)',
  '59   Drama and Theatre(English)',
  '65   Engineering Technology',
  '66   Bio Systems Technology',
  '67   Science for Technology',
  '71   Sinhala',
  '72   Tamil',
  '73   English',
  '74   Pali',
  '75   Sanskrit',
  '78   Arabic',
  '79   Malay',
  '81   French',
  '82   German',
  '83   Russian',
  '84   Hindi',
  '86   Chinese',
  '87   Japanese',

];

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

// subject names and numbers o-level
// tslint:disable-next-line: member-ordering
subjectnamesOl = [
  '11   Buddhism',
  '12   Saivanery',
  '14   Catholicism',
  '15   Christianity',
  '16   Islam',
  '21   Sinhala Language & Lit.',
  '22   Tamil Lanuage & Lit.',
  '31   English',
  '32   Mathematics',
  '33   History',
  '34   Science',
  '60   Business & Accounting Studies',
  '61   Geography',
  '62   Citizenship Education & Governance',
  '63   Entrepreneurship Studies',
  '64   Second Langusge(Sinhala)',
  '65   Second Langusge(Tamil)',
  '66   Pali',
  '67   Sanskrit',
  '68   French',
  '69   German',
  '70   Hindi',
  '71   Japanese',
  '72   Arabic',
  '40   Music (Oriental)',
  '41   Music (Western)',
  '42   Music (Carnatic)',
  '43   Art',
  '44   Dancing (Oriental)',
  '45   Dancing (Bharatha)',
  '46   Appreciation of English Literary Texts',
  '47   Appreciation of Sinhala Literary Texts',
  '48   Appreciation of Tamil Literary Texts',
  '49   Appreciation of Arabic Literary Texts',
  '50   Drama & Theatre (Sinhala)',
  '51   Drama & Theatre (Tamil)',
  '52   Drama & Theatre (English)',
  '80   Information & Communication Technology',
  '81   Agriculture & Food Technology',
  '82   Fisheries & Food Technology',
  '83   Design & Technology',
  '84   Arts & Crafts',
  '85   Home Economics',
  '86   Health & Physical Education',
  '87   Communication & Media Studies',
  '92   Electronic Writing & Shorthand (Sinhala)',
  '93   Electronic Writing & Shorthand (Tamil)',
  '94   Electronic Writing & Shorthand (English)',
];

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
      certState : 'Pending',
      prinapprovState: 'Pending',
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
    certState : 'Pending',
    prinapprovState: 'Pending',
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
    certState : 'Pending',
    prinapprovState: 'Pending',
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
    prinapprovState: 'Pending',
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
    prinapprovState: 'Pending',
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
pendingCertList : certificateRequested [] = [];  //prepared certificates
pendingCertList1 : certificateRequested [] = []; //prepared - principal approval not taken
  ngOnInit() {


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

  }

}
