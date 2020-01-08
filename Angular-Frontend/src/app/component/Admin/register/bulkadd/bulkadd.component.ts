import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

import { FormBuilder, Validators } from '@angular/forms';

import {RegisterService} from '../register.service'; 


export class  User{
  usertype:string;
  name:string;
  userid:string;
  email:string;
  password:string;
  birthday:string;
  gender:string;
  nationality:string;
  NIC:string;
  address:string;
  image:string;
  selectclass:string;
}

@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.scss']
})
export class BulkaddComponent {
  flag=false;
  fileToUpload: File = null;
  Stringdata='';
  users=[];
  userVisibale;
  constructor(private register:RegisterService){ }

  
  
  handleFileInput(files: FileList) {
    
    this.fileToUpload = files.item(0);
  }


  bulkRegistration() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload);
    
    
    fileReader.onload = (e) =>{
      this.Stringdata=fileReader.result.toString();
      // console.log(this.Stringdata);
      var Stringusers=this.Stringdata.split('\n');
      console.log(Stringusers.length);
      
      // console.log(users);
      for (var i=0;i<Stringusers.length;i++){
        
        
        // console.log(userstr);
        if(Stringusers[i]=='\n'){
          console.log(Stringusers[i]);
          // console.log(users);
          break;
        }
        var userstr=Stringusers[i].split(',');

        var user=new User();
        var temp=userstr[0].split(':');
        user.usertype=temp[1];
        var temp=userstr[1].split(':');
        user.name=temp[1];
        var temp=userstr[2].split(':');
        user.userid=temp[1];
        var temp=userstr[3].split(':');
        user.email=temp[1];
        var temp=userstr[4].split(':');
        user.password=temp[1];
        var temp=userstr[5].split(':');
        user.birthday=temp[1];
        var temp=userstr[6].split(':');
        user.gender=temp[1];
        var temp=userstr[7].split(':');
        user.nationality=temp[1];
        var temp=userstr[8].split(':');
        user.NIC=temp[1];
        var temp=userstr[9].split(':');
        user.address=temp[1];
        var temp=userstr[10].split(':');
        user.image=temp[1];
        var temp=userstr[11].split(':');
        user.selectclass=temp[1];
        this.users.push(user);
        // console.log(user);
      }
      this.userVisibale=new Array(this.users.length);
      for(var i=0;i<this.users.length;i++){
        this.userVisibale[i]=true;
      }
      console.log(this.users);
      
      this.flag=true;

    }
    

  }
  addUser(i){
    // const formData = new FormData();
    

    // formData.append('usertype', this.users[i].usertype)
    // formData.append('userid', this.users[i].userid)
    // formData.append('name', this.users[i].name)
    // formData.append('email', this.users[i].email)
    // formData.append('password', this.users[i].password)
    // formData.append('birthday', this.users[i].birthday)
    // formData.append('profileImage', this.users[i].image)
    // formData.append('gender', this.users[i].gender)
    // formData.append('nationality', this.users[i].nationality)
    // formData.append('nicnumber', this.users[i].NIC)
    // formData.append('address', this.users[i].address)
    // console.log(formData);
    this.register.addUser(this.users[i]);
    
    this.userVisibale[i]=false;

      
  }

}
