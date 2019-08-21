import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  password:String;
  email:String;

  constructor(
    private authService: AuthService, 
    private ngFlashMessageService: NgFlashMessageService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  registerData(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // console.log(user);

    this.authService.registerUser(user).subscribe(res=> {
        if(!undefined){
          this.ngFlashMessageService.showFlashMessage({
            // Array of messages each will be displayed in new line
          messages: ["You are Registerd"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 2000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['/login']);
      } 
      else{
        this.ngFlashMessageService.showFlashMessage({
          messages: ["You are not Registerd"],
          dismissible: true, 
          timeout: 2000,
          type: 'warning'
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
