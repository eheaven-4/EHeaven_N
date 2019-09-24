import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-prepare-certification',
  templateUrl: './prepare-certification.component.html',
  styleUrls: ['./prepare-certification.component.scss']
})
export class PrepareCertificationComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
