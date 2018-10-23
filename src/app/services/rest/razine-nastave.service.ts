import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class RazineNastaveService {

  constructor(private http: HttpService) { }

  getAll(){
    return  this.http.getJWT("NastavaRazina/Get", {});
  }

  insert(o){
    return this.http.postJWT("NastavaRazina/Insert", o);
  }

  update(o){
    return this.http.postJWT("NastavaRazina/Update", o);
  }

  delete(id){
    return this.http.getJWT("NastavaRazina/Delete", {ID: id}); 
  }
}
