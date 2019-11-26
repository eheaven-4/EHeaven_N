import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
// import { User } from 'src/app/user';


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
  // public imagePath;
  // imgURL: any;
  // public message: string;

  // preview(files) {
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }
  extractfile() {
    
    
  }
  
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
        this.users.push(user);
        // console.log(user);
      }
      console.log(this.users);
      this.flag=true;
    }

  }

}
