import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UceniciService {

  constructor(private http: HttpService) { }

  getById(id){
    return  this.http.getJWT("User/Get", {ID: id});
  }

  getAll(){
    return this.http.getJWT("User/GetUcenike", {});
  }

  insert(o){
    return this.http.postJWT("User/Insert", o);
  }

  update(o){
    return this.http.postJWT("User/Update", o);
  }

  delete(id){
    return this.http.getJWT("User/Delete", {ID: id});
  }
}
