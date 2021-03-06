import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalDocumentService {

  constructor(private http: HttpService) { }

  insert(UserID: any, files: any[]){
    let formData: FormData = new FormData();
    for(var i=0; i<files.length; i++){
      formData.append('file'+i, files[i], files[i].name);
    }
    formData.append('UserID', UserID);
    this.http.headers = new Headers();
    this.http.options = new RequestOptions({ headers: this.http.headers });
    return this.http.post("Upload/InsertPredavacFiles", formData);
  }
}
