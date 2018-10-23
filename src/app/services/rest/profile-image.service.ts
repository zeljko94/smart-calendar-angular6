import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Headers, RequestOptions } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor(private http: HttpService) { }

  getAll(){
    return this.http.get("ProfileImage/Get", {});
  }

  insert(UserID: any, file: any){
    if(file == null)
      return;
    let formData: FormData = new FormData();
    formData.append('UserID', UserID);
    formData.append("file", file, file.name);
    this.http.headers = new Headers();
    this.http.options = new RequestOptions({ headers: this.http.headers });
    return this.http.post("ProfileImage/Insert", formData);
  }
}
