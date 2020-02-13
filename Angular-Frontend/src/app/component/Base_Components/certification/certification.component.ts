import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

//import {Component} from '@angular/core';
//import {animate, state, style, transition, trigger} from '@angular/animations';

interface Certificate {
  _id: String;
  userid: String;
  certName: String;
  certType: String;
  examName: String;
  examYear: String;
  examIndex: String;
  reqDate: String;
  prinapprovState: String;
  certState: String;
}

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})


export class CertificationComponent implements OnInit {
  value: String = '';
  flag = false;
  userid: String;
  cookie=JSON.parse(this.cookies.getCookie('userAuth'));

  pendingCert: Certificate [] = [];
  issuedCert: Certificate [] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,

  ) { }

  CertificationForm = this.fb.group({
    certName: ['', Validators.required],
    certType: ['', Validators.required],
    exam: this.fb.group({
      examName: ['', Validators.required],
      examYear: ['', Validators.required],
      examIndex: ['', Validators.required]
    })
  });

  // certificate types
  certificates = [
    'Student Status Verification Certificate',
    'Character Certificate',
    'Leaving Certificate',
    'Educational Certificate'
  ];

  // examinations
  exams = [
    'Grade 05 Scholarship Examination',
    'Ordinary Level ( G.C.E. O/L ) Examination',
    'Advanced Level ( G.C.E. A/L ) Examination'
  ];
  // examinations years
  yearofExam = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];

  ngOnInit() {
    let date  = Date();
    let myCookie = JSON.parse(this.cookies.getCookie('userAuth'));  // get userdate cookies from cookies
    let id = myCookie.userid;

    // load pending and issued certificates tho the user
    let pendingUrl = 'http://localhost:3000/certification/pendingCert';
    let issuedUrl = 'http://localhost:3000/certification/issuedCert';

    this.http.get<any>(pendingUrl + '/' + id).subscribe(res => {
      console.log(res);
      this.pendingCert = res;

    });

    this.http.get<any>(issuedUrl + '/' + id).subscribe(res => {
      console.log(res);
      this.issuedCert = res;
    });
  }

  submitToApproval() {
    let myCookie = JSON.parse(this.cookies.getCookie('userAuth'));  // get userdate cookies from cookies
    this.userid = myCookie.userid;     // get userid from cookies
    let date  = Date(); // get todays date and time

    // console.log(this.CertificationForm.value , myCookie.usertype)
    if (this.userid) {
      if (this.CertificationForm.value.certName == '' || this.CertificationForm.value.certType == '') {
        alert('Fill the form field please..!');
      } else {
        // create certificateApproval
        const certificateApproval = {
          userid: myCookie.userid,
          certName: this.CertificationForm.value.certName,
          certType: this.CertificationForm.value.certType,
          examName: this.CertificationForm.value.exam.examName,
          examYear: this.CertificationForm.value.exam.examYear,
          examIndex: this.CertificationForm.value.exam.examIndex,
          reqDate: date,
          // prinapprovState: 'Pending',
          certState: 'Pending'
        };

        let url = 'http://localhost:3000/certification/requestCert';  // server url

        this.http.post<any>(url, certificateApproval).subscribe(res => {   // requesting ro the server and send data to save
          if (res.state) {
            console.log(res.msg);
            alert('Successfully Requested..!');
            this.CertificationForm.reset();
            this.router.navigate(['../',this.cookie.userid,'certification']);
          } else {
            console.log(res.msg);
            alert('Certificate Requesting Unsuccessfull..!');
            this.router.navigate(['../',this.cookie.userid,'certification']);
          }
        });
       // console.log(certificateApproval);
      }
    } else {
      alert('Please Login First..!');
      this.router.navigate(['/login']);
    }
     window.location.reload();     //reload the page
  }


  // used to show/hide form fields

  togglefunction(value) {
    if (value == 'Educational Certificate') {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

}

// import {Component} from '@angular/core';
// import {animate, state, style, transition, trigger} from '@angular/animations';

// /**
//  * @title Table with expandable rows
//  */
// @Component({
//   selector: 'table-expandable-rows-example',
//   styleUrls: ['table-expandable-rows-example.css'],
//   templateUrl: 'table-expandable-rows-example.html',
//   animations: [
//     trigger('detailExpand', [
//       state('collapsed', style({height: '0px', minHeight: '0'})),
//       state('expanded', style({height: '*'})),
//       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
//     ]),
//   ],
// })
// export class TableExpandableRowsExample {
//   dataSource = ELEMENT_DATA;
//   columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
//   expandedElement: PeriodicElement | null;
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   description: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     position: 1,
//     name: 'Hydrogen',
//     weight: 1.0079,
//     symbol: 'H',
//     description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
//         atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
//   }, {
//     position: 2,
//     name: 'Helium',
//     weight: 4.0026,
//     symbol: 'He',
//     description: `Helium is a chemical element with symbol He and atomic number 2. It is a
//         colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
//         group in the periodic table. Its boiling point is the lowest among all the elements.`
//   }, {
//     position: 3,
//     name: 'Lithium',
//     weight: 6.941,
//     symbol: 'Li',
//     description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
//         silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
//         lightest solid element.`
//   }, {
//     position: 4,
//     name: 'Beryllium',
//     weight: 9.0122,
//     symbol: 'Be',
//     description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
//         relatively rare element in the universe, usually occurring as a product of the spallation of
//         larger atomic nuclei that have collided with cosmic rays.`
//   }, {
//     position: 5,
//     name: 'Boron',
//     weight: 10.811,
//     symbol: 'B',
//     description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
//         by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
//         low-abundance element in the Solar system and in the Earth's crust.`
//   }, {
//     position: 6,
//     name: 'Carbon',
//     weight: 12.0107,
//     symbol: 'C',
//     description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
//         and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
//         to group 14 of the periodic table.`
//   }, {
//     position: 7,
//     name: 'Nitrogen',
//     weight: 14.0067,
//     symbol: 'N',
//     description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
//         discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
//   }, {
//     position: 8,
//     name: 'Oxygen',
//     weight: 15.9994,
//     symbol: 'O',
//     description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
//          the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
//          agent that readily forms oxides with most elements as well as with other compounds.`
//   }, {
//     position: 9,
//     name: 'Fluorine',
//     weight: 18.9984,
//     symbol: 'F',
//     description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
//         lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
//         conditions.`
//   }, {
//     position: 10,
//     name: 'Neon',
//     weight: 20.1797,
//     symbol: 'Ne',
//     description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
//         Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
//         two-thirds the density of air.`
//   },
// ];
