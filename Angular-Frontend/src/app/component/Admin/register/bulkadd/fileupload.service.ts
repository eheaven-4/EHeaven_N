import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';

class filedata{
  files:File;
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private _http:HttpClient) { }
  postFile(inputFile:File){
    console.log(inputFile.name);
    var data:filedata;
    data.files=inputFile;
    data.name=inputFile.name;
    const url='http://localhost:3000/filehandler/passFile';
    // const formdate:FormData=new FormData();
    // formdate.append('filKey',inputFile,inputFile.name);
    return this._http.post(url,{params:{file:data}});

  }
  // public upload(
  //   files: Set<File>
  // ): { [key: string]: { progress: Observable<number> } } {}
}
