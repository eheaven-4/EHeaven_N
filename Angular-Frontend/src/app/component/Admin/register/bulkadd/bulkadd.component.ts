import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

import { FormBuilder, Validators } from '@angular/forms';

import {RegisterService} from '../register.service'; 
import { MatSnackBarConfig ,MatSnackBar} from '@angular/material';


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
  filename;
  flag = false;
  images: FileList = null;
  fileToUpload: File = null;
  Stringdata = '';
  users = [];
  userVisibale;
  imageUrls;
  constructor(private register:RegisterService,public snackBar: MatSnackBar){ }


  // load the image as the button event and asign to  the images variable
  selectImage(event) {
    if (event.target.files.length > 0) {  // check the file is select or not.
      const file = event.target.files[0];
      this.images = file;
      this.filename = file.name;
      console.log(this.filename)
    }
  }
  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
    console.log(files[0].name);
  }
  handleImages(files: FileList) {
    // if(this.images==null){
    this.images = files;
    // }else{

    // }/
    // console.log(files.length)
    this.images = files;
    // console.log(this.images.item(0).name);
  }


  bulkRegistration() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload);


    fileReader.onload = (e) => {
      this.Stringdata = fileReader.result.toString();
      // console.log(this.Stringdata);
      var Stringusers = this.Stringdata.split('\n');
      console.log(Stringusers.length);

      // console.log(users);
      for (var i = 0; i < Stringusers.length; i++) {


        // console.log(userstr);
        if (Stringusers[i] == '\n') {
          console.log(Stringusers[i]);
          // console.log(users);
          break;
        }
        var userstr = Stringusers[i].split(',');

        var user = new User();
        var temp = userstr[0].split(':');
        user.usertype = temp[1];
        var temp = userstr[1].split(':');
        user.name = temp[1];
        var temp = userstr[2].split(':');
        user.userid = temp[1];
        var temp = userstr[3].split(':');
        user.email = temp[1];
        var temp = userstr[4].split(':');
        user.password = temp[1];
        var temp = userstr[5].split(':');
        user.birthday = temp[1];
        var temp = userstr[6].split(':');
        user.gender = temp[1];
        var temp = userstr[7].split(':');
        user.nationality = temp[1];
        var temp = userstr[8].split(':');
        user.NIC = temp[1];
        var temp = userstr[9].split(':');
        user.address = temp[1];
        var temp = userstr[10].split(':');
        user.image = temp[1];
        var temp = userstr[11].split(':');
        user.selectclass = temp[1];
        this.users.push(user);
        // console.log(user);
      }
      this.userVisibale = new Array(this.users.length);

      for (var i = 0; i < this.users.length; i++) {
        this.userVisibale[i] = true;
      }
      this.imageUrls = new Array(this.users.length);
      // for(var i=0;i<this.users.length;i++){
      //   for(var j=0;j<this.images.length;j++){
      //     var temp=this.images.item(j).name.split(".");
      //     console.log("hi")
      //     if(this.users[i].image == temp[0]){
      //       var reader = new FileReader();

      //       reader.readAsDataURL(this.images[j]); 

      //       reader.onload = (_event) => { 
      //         console.log("hooo")
      //         this.imageUrls[i] =reader.result; 
      //         if(i==this.images.length-1){
      //           this.flag=true;
      //         }
      //       }

      //     }
      //   }
      // }
      this.flag = true;
      console.log(this.users);



    }



  }
  addUser(i,reload){
    
    return this.register.addUser(this.users[i]).subscribe(res => {
      if (res.state) {
        console.log(res.msg);
        let config = new MatSnackBarConfig();
        config.duration = true ? 2000 : 0;
        this.snackBar.open("Registration Successfull..! ", true ? "Done" : undefined, config);
        if(reload){
          window.location.reload();
        }
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
    this.userVisibale[i]=false;

  }
  remove(i) {
    this.userVisibale[i] = false;
  }
  addAll(){
    for(var i=0;i<this.users.length;i++){
      if(this.userVisibale[i]){
        if( i == this.users.length-1){
          this.addUser(i,1);
        }else{
          this.addUser(i,0);
        }
        
      }
    }
    
  }
  removeAll() {
    window.location.reload();
  }

}
