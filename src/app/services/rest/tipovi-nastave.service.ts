import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class TipoviNastaveService {

  constructor(private http: HttpService) { }

  getAll(){
    return this.http.getJWT("TipNastave/Get", {});
  }

  insert(o){
    return this.http.postJWT("TipNastave/Insert", o);
  }

  update(o){
    return this.http.postJWT("TipNastave/Update", o);
  }

  delete(id){
    return this.http.getJWT("TipNastave/Delete", {ID: id});
  }
}
