import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class TerminDetaljiService {

  constructor(private http: HttpService) { }

  getForTermin(TerminNastavaID){
    return this.http.getJWT("TerminNastavaDetalji/GetForTermin", {TerminNastavaID: TerminNastavaID});
  }

  update(o){
    return this.http.postJWT("TerminNastavaDetalji/Update", o);
  }
}
