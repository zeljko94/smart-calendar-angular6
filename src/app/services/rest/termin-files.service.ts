import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TerminFilesService {

  constructor(private http: HttpService) { }

  getForTermin(TerminNastavaID){
    return this.http.getJWT("TerminNastavaFile/GetForTermin", {TerminNastavaID: TerminNastavaID});
  }

  insert(TerminID: any, files: any[]){
    let formData: FormData = new FormData();
    for(var i=0; i<files.length; i++){
      formData.append('file'+i, files[i], files[i].name);
    }
    formData.append('TerminID', TerminID);
    this.http.headers = new Headers();
    this.http.options = new RequestOptions({ headers: this.http.headers });
    return this.http.post("Upload/InsertTerminFiles", formData);
  }
}
