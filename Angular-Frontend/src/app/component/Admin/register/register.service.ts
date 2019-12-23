import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
        
        private http: HttpClient,
        private fb: FormBuilder,
        public snackBar: MatSnackBar

    ) { }

  addUser(formData){
    const url = 'http://localhost:3000/users/bulkUserRegistration';

    this.http.post<any>(url,formData).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Registration Successfull..! ", true ? "Done" : undefined, config);
        // this.ngProgress.done();
        return true;
        
      }
      else {
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Registration Unsuccessfull..! ", true ? "Retry" : undefined, config);
        // this.router.navigate(['/register']);
        return false;
      }
    });
  }

}
  
  