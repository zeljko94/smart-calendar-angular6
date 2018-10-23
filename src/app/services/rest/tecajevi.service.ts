import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class TecajeviService {

  constructor(private http: HttpService) { }

  getById(id){
    return this.http.getJWT("Nastava/Get", {ID: id});
  }

  getAll(){
    return this.http.getJWT("Nastava/Get", {});
  }

  getForPredavac(id){
    return this.http.getJWT("Nastava/GetForPredavac", {PredavacID: id});
  }

  getForUcenik(id){
    return this.http.getJWT("Nastava/GetForUcenik", {UcenikID: id});
  }

  delete(id){
    return this.http.getJWT("Nastava/Delete", {ID: id});
  }

  deleteSudionik(id, TecajID){
    return this.http.getJWT("Nastava/DeleteSudionik", {SudionikID: id, TecajID: TecajID});
  }

  insert(o){
    return this.http.postJWT("Nastava/Insert", o);
  }

  update(o){
    return this.http.postJWT("Nastava/Update", o);
  }
}
