import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.scss']
})
export class ManageMarksComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }
// certificate types
certificates = [
  'Student Status Verification Certificate',
  'Character Certificate',
  'Leaving Certificate',
  'Educational Certificate'
];
CertificationForm = this.fb.group({
  certName: ['', Validators.required],
  certType: ['', Validators.required],
  exam: this.fb.group({
    examName: ['', Validators.required],
    examYear: ['', Validators.required],
    examIndex: ['', Validators.required]
  })
});
  ngOnInit() {
  }

}
