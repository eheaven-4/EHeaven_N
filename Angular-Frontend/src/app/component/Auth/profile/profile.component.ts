import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { MycookiesService } from '../../Admin/mycookies.service';
import { faAt, faPhone, faMap , faMobile, faBirthdayCake, faVenusMars, faGlobeEurope} from '@fortawesome/free-solid-svg-icons';

interface profile {
  usertype: String;
  userid: String;
  name: String;
  email: String;
  password: String;
  birthday: String;
  mobilenumber: String;
  homenumber: String;
  gender: String;
  nationality: String;
  nicnumber: String;
  father: String;
  mother: String;
  address: String;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faVenusMars =faVenusMars
  faAt = faAt
  faGlobeEurope = faGlobeEurope
  faPhone = faPhone
  faBirthdayCake =faBirthdayCake
  faMap = faMap
  faMobile  = faMobile
  profiledata: profile[] = []

  authtoken: any;
  user: any;
  id: any;

  constructor(
    private http: HttpClient,
    private cookies: MycookiesService,
    private router:Router,
  ) { }

  ngOnInit() {
    
    if(this.cookies.getCookie("userAuth")!=""){

    
      var myCookie = JSON.parse(this.cookies.getCookie("userAuth"))
      this.id = myCookie.userid;
      
      var url = "http://localhost:3000/users/profile";

      this.http.get<any>(url + '/' + this.id).subscribe(res => {
        this.profiledata = res;
      }, (err) => {
        console.log(err);
      });
    
      if(this.router.url!='/'+this.id){
        this.router.navigate(['/404']);
        
      }
    }else{
      this.router.navigate(['/login']);
    } 
  }
}
