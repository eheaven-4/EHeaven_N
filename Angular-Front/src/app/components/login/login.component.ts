import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;

  constructor(
    private authService:AuthService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser(){
      const user = {
        email:this.email,
        password:this.password
      };
    
      this.authService.loginUser(user).subscribe( res=> {
        console.log(JSON.stringify(res));
        if(res.state){

          this.authService.storeData(res.token, res.user);

          this.flashMessage.showFlashMessage({
          messages: ["Login Successfully"],
          dismissible: true, 
          timeout: 2000,
          type: 'success'
        });
        this.router.navigate(['/profile']);
        
        }
        else{
          this.authService.loginUser(user).subscribe(res => {
            this.flashMessage.showFlashMessage({
            messages: ["Login Unsccessful"],
            dismissible: true, 
            timeout: 2000,
            type: 'warning'
          });
          this.router.navigate(['/login']);
          });
        }
    });
  }
}
