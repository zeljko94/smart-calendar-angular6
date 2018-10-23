import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ObavijestiService {

  constructor(private http: HttpService) { }

  getForTecaj(TecajID){
    return this.http.getJWT("TecajObavijest/GetForTecaj", {TecajID: TecajID});
  }

  insert(o){
    return this.http.postJWT("TecajObavijest/Insert", o);
  }

  delete(id){
    return this.http.getJWT("TecajObavijest/Delete", {ID: id});
  }
}
