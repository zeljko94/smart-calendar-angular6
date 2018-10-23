import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class NastavneCjelineService {

  constructor(private http: HttpService) { }

  getForTecaj(TecajID){
    return this.http.getJWT("NastavnaCjelina/GetForTecaj", {TecajID: TecajID});
  }

  insert(o){
    return this.http.postJWT("NastavnaCjelina/Insert", o);
  }

  delete(id){
    return this.http.getJWT("NastavnaCjelina/Delete", {ID: id});
  }
}
