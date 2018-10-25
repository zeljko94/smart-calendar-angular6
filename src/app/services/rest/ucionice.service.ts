import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { SwalService } from '../swal.service';

@Injectable({
  providedIn: 'root'
})
export class UcioniceService {

  constructor(private http: HttpService,
              private swal: SwalService) { }

  getAll(){
    return this.http.getJWT("Ucionica/Get", {});
  }

  delete(id){
    return this.http.getJWT("Ucionica/Delete", {ID: id});
  }

  insert(o){
    return this.http.postJWT("Ucionica/Insert", o);
  }

  update(o){
    return this.http.postJWT("Ucionica/Update", o);
  }

  /*
  testInsert(o, store){
    return new Observable(observer => {
    this.http.postJWT("Ucionica/Insert", o)
      .subscribe(
        data => {
          this.sc(observer, data, store);
        },
        err => {
          this.error(observer, err);
        }
      );
    });
  }

  sc(observer, data, store){
    if(this.swal.handleResponse(data)){
      store.push(data.Data);
    }
    observer.next(data);
    observer.complete();
  }

  error(observer, err){
    return Observable.throw(err);
    //observer.next(err);
    //observer.complete();
  }
  */
}
