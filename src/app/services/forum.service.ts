import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpService) { }

  getAll(){
    return this.http.getJWT("Forum/Get", {});
  }

  getForUser(id){
    return this.http.getJWT("Forum/GetForUser", {UserID: id});
  }

  getById(id){
    return this.http.getJWT("Forum/Get", {ID: id});
  }

  insert(o){
    return this.http.postJWT("Forum/Insert", o);
  }

  insertPost(o){
    return this.http.postJWT("Forum/InsertPost", o);
  }

  delete(id){
    return this.http.getJWT("Forum/Delete", {ID: id});
  }

  deletePost(id){
    return this.http.getJWT("Forum/DeletePost", {PostID: id});
  }

}
