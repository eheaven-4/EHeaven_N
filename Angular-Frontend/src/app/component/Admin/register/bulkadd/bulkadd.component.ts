import { Component, OnInit } from '@angular/core';
import {FileuploadService} from './fileupload.service';

@Component({
  selector: 'app-bulkadd',
  templateUrl: './bulkadd.component.html',
  styleUrls: ['./bulkadd.component.scss']
})
export class BulkaddComponent implements OnInit {
  fileToUpload:File=null;

  constructor(public fileHandler:FileuploadService) { }

  ngOnInit() {
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
