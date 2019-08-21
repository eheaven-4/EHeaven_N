import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

interface profile{
  name:String,
  username: String,
  email: String,
  password:String
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any;

  constructor(
    private authservice: AuthService,
    
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res=> {
      // this.user = res.user;
      console.log(res);
       
    });
  }

}
