// import { Injectable } from '@angular/core';
// import{HttpClient} from '@angular/common/http';
// import { fbind } from 'q';
// import {FileSelectDirective,FileUploader} from 'ng2-file-upload';


// // import { Subject } from 'rxjs/Subject';
// // import { Observable } from 'rxjs/Observable';
// const url='http://localhost:3000/filehandler/upload';


// @Injectable({
//   providedIn: 'root'
// })
// export class FileuploadService {

//   uploader:FileUploader=new FileUploader({url:url});
//   attchmentList:any=[];

//   constructor() {
//     this.uploader.onCompleteItem=(item:any,response:any,headers:any)=>{
//       this.attchmentList.push(JSON.parse(response));
//     }


//    }
//   // UploadFile(inputFile:File){
//   //   console.log(inputFile);
    
//   //   const formdata=new FormData();
//   //   formdata.append('textfile',inputFile,inputFile.name);
//   //   return this._http.post(url,formdata);
//   //   // var data:filedata;
//   //   // data.files=inputFile;
//   //   // data.name=inputFile.name;
//   //   //
//   //   // // const formdate:FormData=new FormData();
//   //   // // formdate.append('filKey',inputFile,inputFile.name);
//   //   // return this._http.post(url,{params:{file:data}});

//   // }
//   // // public upload(
//   // //   files: Set<File>
//   // // ): { [key: string]: { progress: Observable<number> } } {}
// }
