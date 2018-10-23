import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getAll(privileges=null){
    if(!privileges){
      return this.http.getJWT("User/Get", {});
    }
    else if(privileges == 'predavac'){
      return this.http.getJWT("User/GetPredavace", {});
    }
    else if(privileges == 'ucenik'){
      return this.http.getJWT("User/GetUcenike", {});
    }
  }

  get(id){
    return this.http.getJWT("User/Get", {ID: id});
  }

  delete(id){
    return this.http.getJWT("User/Delete", {ID: id});
  }
}
