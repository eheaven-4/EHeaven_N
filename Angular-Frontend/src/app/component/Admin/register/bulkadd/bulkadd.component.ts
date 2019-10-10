import { Component, OnInit } from '@angular/core';
import {FileuploadService} from './fileupload.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.scss']
})
export class BulkaddComponent implements OnInit {
  fileToUpload:File=null;

  constructor(public fileHandler:FileuploadService) { }

  private files=[];
  private url='http://localhost:3000/upload';
  private uploader :FileUploader;

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url});

    this.fileHandler.showFileNames().subscribe(response => {
      for (let i = 0; i < response.json().length; i++) {
        this.files[i] = {
          filename: response.json()[i].filename,
          originalname: response.json()[i].originalname,
          contentType: response.json()[i].contentType
        };
      }
    });
  }
  handleFile(files:FileList){
    console.log(files.item(0));
    //this.fileToUpload=files.item(0);
    this.fileHandler.postFile(files.item(0))
      .subscribe(data=>{
        console.log("Success");
      },error=>{console.error()}
      );
    
  }

}
