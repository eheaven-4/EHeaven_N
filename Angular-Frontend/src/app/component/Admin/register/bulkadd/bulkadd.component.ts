import { Component, OnInit } from '@angular/core';
// import {FileuploadService} from './fileupload.service';
import {FileSelectDirective,FileUploader} from 'ng2-file-upload';

const url='http://localhost:3000/filehandler/upload';
@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.scss']
})
export class BulkaddComponent{
  uploader:FileUploader=new FileUploader({url:url});
  attchmentList:any=[];

  constructor() { 
    console.log("a");
    this.uploader.onCompleteItem=(item:any,response:any,headers:any)=>{
      console.log("h");
      //this.attchmentList.push(JSON.parse(response));
    }
    console.log("b");
  


  // ngOnInit() {

  


  // };
  // FileSelcted(event){
  //   console.log(event);
  //   this.fileToUpload=event.target.files[0];
  // }
  // UploadFile(){
  //   console.log(this.fileToUpload);
  //   this.fileHandler.UploadFile(this.fileToUpload).subscribe(
  //     res=>{console.log(res);}
  //   );

  }
    // this.uploader = new FileUploader({url: this.url});

    // this.fileHandler.showFileNames().subscribe(response => {
    //   for (let i = 0; i < response.json().length; i++) {
    //     this.files[i] = {
    //       filename: response.json()[i].filename,
    //       originalname: response.json()[i].originalname,
    //       contentType: response.json()[i].contentType
    //     };
    //   }
    // });
  // }
  
}
