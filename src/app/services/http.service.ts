
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: Headers;
  options: RequestOptions;
  API_LINK: string = "http://localhost:51418/api/";

  
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
   }

   constructUrl(link, params){
    var st = link;
    if(!(Object.keys(params).length === 0 && params.constructor === Object)){
      st += "?";
      var i=0;
       for (var k in params) {
         if (params.hasOwnProperty(k)) {
           st += k;
           st += "=";
           st += params[k];
           if(i < Object.keys(params).length - 1)
             st += "&";
         }
     }
   }
   return st;
  }



  JWTHeaders(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    var token = JSON.parse(localStorage.getItem('jwt_token'));
    this.headers.append('Authorization', 'Bearer ' + token );
    this.options = new RequestOptions({ headers: this.headers });
  }

  postJWT(link, data){
    this.JWTHeaders();
    return this.http.post(this.API_LINK + link, data, this.options)
    .pipe(map((res:Response) =>  res.json()));
  }

  getJWT(link, params){
    this.JWTHeaders();
    return this.http.get(this.API_LINK + this.constructUrl(link, params), { headers: this.headers})
      .pipe(map((res:Response) => res.json()));
  }
  
   getBlob(id){
    return this.http.get(this.API_LINK + "Upload/TestDownload?ID=" + id, {responseType: ResponseContentType.Blob})
    .pipe(map((response:Response) => response.blob()));
   }

   get(link, params){
    return this.http.get(this.API_LINK + this.constructUrl(link, params))
      .pipe(map((res:Response) => res.json()));
  }

  post(link, data){
   return this.http.post(this.API_LINK + link, data, this.options)
   .pipe(map((res:Response) =>  res.json()));
  }
}
