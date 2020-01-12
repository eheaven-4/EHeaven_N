import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MycookiesService } from '../../Admin/mycookies.service';

@Component({
  selector: 'app-extra-curricular',
  templateUrl: './extra-curricular.component.html',
  styleUrls: ['./extra-curricular.component.scss']
})
export class ExtraCurricularComponent implements OnInit {

  flag = false;
  value: String = '';
  userid: String;
  cookie=JSON.parse(this.cookies.getCookie('userAuth'));

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,) { }

    extracurrForm = this.fb.group({
      extracurrCat: ['', Validators.required],
      desp: ['', Validators.required],
      dateofMembership: ['', Validators.required],
      sportclubs: this.fb.group({
        extracurrname: ['', Validators.required],
        type: ['', Validators.required],
        compName: ['', Validators.required],
        dateofAchv: ['', Validators.required],
        achv: ['', Validators.required],
      })
    });


  category = [
    'Sports',
    'Clubs & Associations',
    'Aesthetics',
    'Scouting/Cadeting',
    'Other'
  ];

  extras = [
    'Chess',
    'Cricket',
    'bla',
    'bla',
    'bla'
  ];

  type = [
    'Membership',
    'District Level',
    'Provincial Level',
    'All Island Level',
    'International',
  ];
  ngOnInit() {
  }

  submitToApproval() {
    let myCookie = JSON.parse(this.cookies.getCookie('userAuth'));  // get userdate cookies from cookies
    this.userid = myCookie.userid;     // get userid from cookies
    let date  = Date(); // get todays date and time
    console.log('Hello at ');
    //console.log(this.extracurrForm.value , myCookie.usertype)
    if (this.userid) {
      if (this.extracurrForm.value.extracurrCat == '' || this.extracurrForm.value.desp == '') {
        alert('Fill the form field please..!');
      } else {
        // create extracurrApproval
        const extracurrApproval = {
          userid: myCookie.userid,
          extracurrCat: this.extracurrForm.value.extracurrCat,
          desp: this.extracurrForm.value.desp,
          dateofMembership: this.extracurrForm.value.dateofMembership,
          extracurrname: this.extracurrForm.value.sportclubs.extracurrname,
          type: this.extracurrForm.value.sportclubs.type,
          compName: this.extracurrForm.value.sportclubs.compName,
          dateofAchv: this.extracurrForm.value.sportclubs.dateofAchv,
          achv: this.extracurrForm.value.sportclubs.achv,
          reqDate: date,
          micapprovState: 'Pending',
          state: 'Pending'
        };

        let url = 'http://localhost:3000/student_extra/requestExtracurr';

        this.http.post<any>(url, extracurrApproval).subscribe(res => { 
          if (res.state) {
            console.log(res.msg);
            alert('Successfully Requested..!');
            this.extracurrForm.reset();
            this.router.navigate(['../',this.cookie.userid,'extra_curricular']);
          } else {
            console.log(res.msg);
            alert('Unsuccessfull..!');
            this.router.navigate(['../',this.cookie.userid,'extra_curricular']);
          }
        });
        console.log(extracurrApproval);
      }
    } else {
      alert('Please Login First..!');
      this.router.navigate(['/login']);
    }
     //window.location.reload();     //reload the page
  }


  togglefunction(value) {
    if (value == 'Sports' || value == 'Clubs & Associations' ) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

}
