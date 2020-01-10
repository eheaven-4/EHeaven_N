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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cookies: MycookiesService,) { }

    extracurrForm = this.fb.group({
      extracurrCat: ['', Validators.required],
      dateofMembership: ['', Validators.required],
      sportclubs: this.fb.group({
        compName: ['', Validators.required],
        dateofAchv: ['', Validators.required],
        desp: ['', Validators.required],
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


  togglefunction(value) {
    if (value == 'Sports' || value == 'Clubs & Associations' ) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

}
