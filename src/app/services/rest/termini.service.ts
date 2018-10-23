import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class TerminiService {

  constructor(private http: HttpService) { }


  getAll(){
    return this.http.getJWT("TerminNastava/Get", {});
  }

  getForTecaj(TecajID){
    return this.http.getJWT("TerminNastava/GetForTecaj", {TecajID: TecajID});
  }

  getForUcenik(UcenikID){
    return this.http.getJWT("TerminNastava/GetForUcenik", {UcenikID: UcenikID});
  }

  delete(id){
    return this.http.getJWT("TerminNastava/Delete", {ID: id});
  }

  update(o){
    return this.http.postJWT("TerminNastava/Update", o);
  }
}
